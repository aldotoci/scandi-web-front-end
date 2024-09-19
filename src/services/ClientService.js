import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

class ClientService {
    static client = new ApolloClient({
        uri: 'http://localhost:5555/graphql', // GraphQL endpoint
        // uri: 'http://localhost:8080/graphql', // GraphQL endpoint
        cache: new InMemoryCache(),
    });

    // Fetch categories using Apollo Client
    static getCategories = async () => {
        const query = gql`
            query GetCategories {
                categories {
                    name
                }
            }
        `;

        try {
            const result = await this.client.query({
                query: query,
            });
            return result.data.categories; // Return the data from the response
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    };

    static getProductsForGrid = async (category) => {
        const query = gql`
            query{
                productByCategory(category: "${category}"){
                    id
                    name
                    gallery
                    inStock
                    prices{
                        amount
                        currency{
                            symbol
                        }
                    }
                    attributes{
                        id
                        name
                        type
                        items{
                            id
                            displayValue
                            value
                        }
                    }
                }
            }
        `;

        try {
            const result = await this.client.query({
                query: query,
                variables: {
                    category: category,
                },
            });
            return result.data.productByCategory || []; // Return the data from the response
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    };

    static getProductById = async (id) => {
        const query = gql`
            query{
                product(id: "${id}"){
                    id
                    inStock
                    name
                    gallery
                    category
                    brand
                    inStock
                    description
                    prices{
                        amount
                        currency{
                            label
                            symbol
                        }
                    }
                    attributes{
                        id
                        name
                        type
                        items{
                            id
                            displayValue
                            value
                        }
                    }
                }
            }
        `;

        try {
            const result = await this.client.query({
                query: query,
                variables: {
                    id: id,
                },
            });
            console.log('result.data.product', result.data.product)
            return result.data.product; // Return the data from the response
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
}

export default ClientService;
