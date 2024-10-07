import gql from 'graphql-tag'

export const SIGNUP_MUTATION = gql`mutation signupMutation($name: String!,$email: String!,$password: String!) {
    insert_users(objects: {email: $email, name: $name, password: $password, account_id: "1"}) {
        returning {
            id
            name
            email
            account_id
        }
    }
}
`

export const LOGIN = gql`query LoginUser($email: String!) {
    users(where: {email: {_eq: $email}}) {
        id
        email
        account_id
        name
        phone
        address
        shop {
            subdomain
        }
    }
}
`

export const ALL_USERS_QUERY = gql`query AllUsersQuery {
    users {
        name
        email
        id
    }
}  
`

export const USER_QUERY = gql`query UserQuery($id: Int!) {
    users_by_pk(id: $id) {
        id
        name
        email
        produk_aggregate {
            aggregate {
                count
            }
        }
    }
}  
`

export const PRODUCT_QUERY = gql`query ProductDetailsQuery($slug: String!) {
    products(where: {slug: {_eq: $slug}}) {
        name
        slug
        id
        description
        price
        stock
        weight 
        images(where: {model: {_eq: "product"}}) {
            url
        }
    }
}  
`

export const PRODUCT_D_QUERY = gql`query ProductDetailsQuery($id: Int!) {
    products_by_pk(id: $id) {
        name
        slug
        stock
        price
        description
        images(where: {model: {_eq: "product"}}) {
            url
        }
    }
}
`

export const ALL_PRODUCT_QUERY = gql`query ProductQuery($account_id: bigint!) {
    products(where: {account_id: {_eq: $account_id}}) {
        name
        slug
        id
        description
        stock
        price
        weight 
        images(where: {model: {_eq: "product"}}) {
            url
        }
    }
}
`

export const ACCOUNT_D_QUERY = gql`query ShopDetailsQuery($subdomain: String!) {
    accounts(where: {subdomain: {_eq: $subdomain}}) {
      id
      shop
      subdomain
      website
      setting {
        email
        logo(where: {model: {_eq: "logo"}}) {
          url
        }
        phone
      }
    }
  }
`  

export const PROVINCE_QUERY = gql`query ProvinceQuery($country_id: Int!) {
    province(where: {country_id: {_eq: $country_id}}) {
        name
        id
    }
}  
`

export const CITY_QUERY = gql`query CityQuery($province_id: Int!) {
    city(where: {province_id: {_eq: $province_id}}) {
        name
        id
    }
}  
`

export const STATE_QUERY = gql`query StateQuery($city_id: Int!) {
    districts(where: {city_id: {_eq: $city_id}}) {
        name
        id
    }
}  
`

export const PAYMENT_QUERY = gql`query BankShop($account_id: bigint!) {
    bank(where: {account_id: {_eq: $account_id}}) {
        bank_account
        name_holder
        name {
            name
            logo
        }
    }
}
`

export const ORDER_CREATED = gql`mutation addOrderDetail($account_id: Int!, $address: String!, $city: bigint!, $customer_id: Int!, $discount: float8!, $email: String!, $name: String!, $notes: String!, $order_code: String!, $order_date: date!, $phone: String!, $receipt_number: String!, $shipment: String!, $shipping_charges: float8!, $status: smallint!, $tax: float8!, $total: float8!) {
    insert_orders_one(object: {account_id: $account_id, address: $address, city: $city, customer_id: $customer_id, discount: $discount, email: $email, name: $name, notes: $notes, order_code: $order_code, order_date: $order_date, phone: $phone, receipt_number: $receipt_number, shipment: $shipment, shipping_charges: $shipping_charges, status: $status, tax: $tax, total: $total}) {
        total
        status
        order_date
        order_code
        notes
        shipment
        id
        account_id
        email
        name
    }
}
`

export const PRODUCT_ORDER_CREATED = gql`mutation addOrderDetail($orderId: bigint!, $productId: bigint!, $productVariant: bigint!, $qty: bigint!, $unitPrice: float8!) {
    insert_order_details(objects: {order_id: $orderId, product_id: $productId, product_variants_id: $productVariant, quantity: $qty, unit_price: $unitPrice}) {
        returning {
                id
        }
    }
}
`

export const PRODUCT_UPDATED = gql`mutation updateStockAfterOrder($id: bigint!, $stock: bigint!) {
    update_products_by_pk(pk_columns: {id: $id}, _set: {stock: $stock}) {
        stock
    }
}
`
