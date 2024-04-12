# Tekana-eWallet

Welcome to Tekana-eWallet, the trusted and efficient solution for safeguarding your funds and facilitating smooth financial transactions.

---

# Strategy

Step 1: Understand the problem

- Functional requirements

- Non-functional requirements

Step 2: High-level design: l designed three microservices 

-  API as getway

- Wallet

- customer

Step 3: Security

## Elaboration

**Step 1: Understand the problem**

Digital wallets can have various interpretations depending on who you ask. Some might think of them as virtual wallets like Apple Pay or Google Pay, while others envision them as online payment platforms. It's essential to determine the exact needs from the start, which is why I involve business stakeholders using agile approaches.

**_Functional requirements_**

Here business people may suggest different features like:

- Login
- Register
- Topup your wallet
- View your transactions


**_Non-Functional requirements_**

And then some non-functional requirements that accompanies the above listed may be something like:

- Reliability
- Fault tolerance

**Step 2 - Propose High-Level Design**

Given the business stakeholders' focus on optimizing speed, robustness, security, and flexibility, I recommend implementing a distributed architecture. This approach allows each service to be independently developed in any language while ensuring the ability to scale effectively as needed.

Internal services communicate using two types of communication patterns: **synchronous** vs **asynchronous**. Both patterns offer unique benefits and drawbacks.

**_Synchronous communication_**

Synchronous communication methods like HTTP are efficient for smaller setups but can present issues as the system grows. They introduce an extended request-response cycle involving multiple services, which can lead to the following issues:

- Performance limitations: If one service in the chain faces delays, it can impact the overall system performance.

- Tight integration: The request sender needs to be aware of the recipient.

- Scaling challenges: Accommodating sudden increases in traffic can be difficult to manage effectively.

**_Asynchronous communication_**

In an asynchronous communication model, each request (or message) is handled by multiple services independently. For instance, Kafka is well-suited to this approach. Messages remain in Kafka even after being consumed, enabling various services to process them simultaneously. This method complements the Tekana-eWallet system because a single request can trigger multiple responses, such as logging transactions, updating account balances, or sending email confirmations. A visual example is shown below.

![alt text](./assets/design.png)

While synchronous communication offers a straightforward design, it restricts service autonomy. Asynchronous communication prioritizes scalability and failure resilience, making it more suitable for large-scale systems.

Given the decision to adopt a distributed architecture with asynchronous communication, I would utilize complementary design patterns such as CQRS, event-driven architecture, and orchestration to enhance system performance and flexibility.

**Payment security**

Security is very important. I can suggest different techniques to combat cyberattacks.

  Problem                                                       Solution                                 
  --------                                                      ------------ 
| Request/Response eavesdropping              | Implement HTTPS                                |
| Data loss                                   | Use data replication across multiple regions   |
| Distributed denial of service attack (DDoS) | Apply rate limiting and deploy firewalls       |

# System documentation

## Pre-requisites

- Docker

## Installing

- Install [Docker](https://docs.docker.com/get-docker/) if you dont have it installed.

## Getting Started

1. Git clone this repository && cd to the project directory

```
git clone https://github.com/maniplek/tekana-e-walet.git
```

## Run the project

#### Using VSCode or any of your favorite editor

P.S: Before starting up the containers make sure the following ports are not in use to avoid any conflict.

```
Ports: (6379, 29092, 5432, 3000, 4000,5000,9000,8085)
```

Type  `./run.sh` in project root directory to spin up all services in docker containers.

Congratulations! You have successfully launched the App.

## To check if the APP is up and running.

```
http://localhost:3000/<endpoint>
```

## Endpoints

### User:

| Method | Endpoint              | Enable a user to:                     |
| ------ | --------------------- | ------------------------------------- |
| GET    | /                     | Check if tekana app is up and running |
| POST   | /auth/register        | Register as a customer                |
| POST   | /auth/login           | Login as a customer                   |
| GET    | /wallets/balance      | Get your wallet balance               |
| POST   | /wallets/topUp        | Add money to your wallet              |
| GET    | /wallets/transactions | Get your account transactions         |
| GET    | /wallets              | Get your wallet                       |
| GET    | /users                | Get your profile                      |


#### Register

Method: POST

Endpoint: /auth/register

Payload:

```
{
    "name": "maniple",
    "email": "maniple@gmail.com",
    "password": "1234mani#"
}
```

best response

```
{
    "statusCode": 201,
    "data": {
        "user": {
            "name": "maniple",
            "email": "maniple@gmail.com",
            "isAdmin": false,
            "id": "6005ce5e-4e21-400c-987b-7ae0ea9e23ba",
            "createdAt": "2024-04-10T02:26:37.230Z",
            "updatedAt": "2024-04-10T02:26:37.230Z"
        },
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2JmNGI1Ny01ZWE4LTQyOWMtOWY5MC1lZWUwNzE3MjA2ZmEiLCJlbWFpbCI6Im51eUBnbWFpbC5jb20iLCJuYW1lIjoic2FtdWVsIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjUxNTQ2NCwiZXhwIjoxNzEyNjAxODY0fQ.kRZmu5aePAon-FuErmYiYMUL7yWw4hw6SA9EbAmQ0_k"
    }
}
```

bad path response

```
{
    "statusCode": 400,
    "message": "Email is already taken, try another one"
}
```

#### Login

Method: POST

Endpoint: /auth/login

Payload:

```
{

    "email": "maniple@gmail.com",
    "password": "11234mani#"
}
```

best response 

```
{
    "statusCode": 200,
    "data": {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlN2JmNGI1Ny01ZWE4LTQyOWMtOWY5MC1lZWUwNzE3MjA2ZmEiLCJlbWFpbCI6Im51eUBnbWFpbC5jb20iLCJuYW1lIjoic2FtdWVsIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxMjUxNTQ2NCwiZXhwIjoxNzEyNjAxODY0fQ.kRZmu5aePAon-FuErmYiYMUL7yWw4hw6SA9EbAmQ0_k"
    }
}
```

bad path response

```
{
    "statusCode": 400,
    "message": "Invalid email or password"
}
```

#### Get balance

Method: GET

Authentication: provide the access_token as a bearer token on every request

![alt text](./assets/access_token.png)

Endpoint: /wallets/balance

Payload:
N/A

best response

```
{
    "statusCode": 200,
    "data": {
        "balance": 30000
    }
}
```

bad  response 

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

#### Topup

Method: POST

Authentication: provide the access_token as a bearer token on every request

Endpoint: /wallets/topUp

Payload:

```
{
    "amount": 10000
}
```

best reponse

```
{
    "statusCode": 200,
    "data": {
        "txnId": "7f660459-7263-48c9-a2cc-6bd1ce73fed3",
        "txnDescription": "DEPOSIT",
        "txnDate": "2024-04-10T02:17:18.144Z",
        "balance": 30000
    }
}
```

bad response

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

#### Get transactions

Method: GET

Authentication: provide the access_token as a bearer token on every request

Endpoint: /wallets/transactions

Payload:
N/A

best response

```
{
    "statusCode": 200,
    "data": {
        "totalTransactions": 2,
        "foundTransactions": [
            {
                "id": "b41066f6-4f85-4e94-84b5-4bc263fe2a34",
                "description": "DEPOSIT",
                "amount": "10000",
                "type": "TOP_UP",
                "createdAt": "2024-04-11T01:55:23.894Z",
                "updatedAt": "2024-04-11T01:55:23.894Z"
            },
            {
                "id": "649b6c5c-a4a4-4e2e-acf7-dcc9530e77a1",
                "description": "DEPOSIT",
                "amount": "10000",
                "type": "TOP_UP",
                "createdAt": "2024-04-11T01:55:56.166Z",
                "updatedAt": "2024-04-11T01:55:56.166Z"
            }
        ]
    }
}
```

bad response

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

#### Get wallets

Method: GET

Authentication: provide the access_token as a bearer token on every request

Endpoint: /wallets

Payload:
N/A

good response

```
{
    "statusCode": 200,
    "data": {
        "totalWallets": 1,
        "foundWallets": [
            {
                "id": "7e3f2128-d9ae-42dd-8b51-488e257adb37",
                "balance": "10000",
                "createdAt": "2024-04-11T01:55:04.931Z",
                "updatedAt": "2024-04-11T01:55:23.920Z"
            }
        ]
    }
}
```

bad response

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

#### Get users

Method: GET

Authentication: provide the access_token as a bearer token on every request

Endpoint: /users

Payload:
N/A

best reponse

```
{
    "statusCode": 200,
    "data": {
        "totalUsers": 1,
        "foundUsers": [
            {
                "id": "8e7df35b-b991-4cba-9a7e-6961d88a8385",
                "name": "frank",
                "email": "frank@gmail.com",
                "password": "$2b$10$.niwSPzPelmdqdcv4JrCTetjjJPfMO8qMeAP9WRgvHZAcj/EFJO2a",
                "createdAt": "2024-40-12T01:55:04.809Z",
                "updatedAt": "2024-04-12T01:55:04.809Z"
            }
        ]
    }
}
```

bad response

```
{
    "statusCode": 401,
    "message": "Unauthorized"
}
```

## Tests

To run the tests:

1.  Go to api directory `cd api`
2.  Replace envs in `.env` file with the envs of `.env.test` file
3.  Run `npm run test`


## Authors

- **Maniple Kwizera**
