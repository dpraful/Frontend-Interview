import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
  ListRenderItem,
} from 'react-native';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export default function App() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(
        'https://dummyjson.com/products',
      );

      const json: ProductResponse = await response.json();

      setData(json.products);
    } catch (error: unknown) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterData: Product[] = data.filter(item =>
    item.title
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  const pageData: Product[] = filterData.slice(
    (page - 1) * 10,
    page * 10,
  );

  const renderItem: ListRenderItem<Product> = ({
    item,
  }) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.image}
        />

        <Text>{item.title}</Text>

        <Text>${item.price.toFixed(2)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={(text: string) => {
          setSearch(text);
          setPage(1);
        }}
        placeholder="Search..."
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <FlatList
            numColumns={4}
            data={pageData}
            renderItem={renderItem}
            keyExtractor={(item: Product) =>
              item.id.toString()
            }
          />

          <Text style={styles.page}>
            Page {page}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="PREV"
              disabled={page === 1}
              onPress={() =>
                setPage(prev => prev - 1)
              }
            />

            <Button
              title="NEXT"
              disabled={
                page * 10 >= filterData.length
              }
              onPress={() =>
                setPage(prev => prev + 1)
              }
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },

  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 200,
    minWidth: 300,
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
  },

  page: {
    textAlign: 'center',
    margin: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});