## Backend Express Codebase

This is template for backen express application. You can fork or clone this template.

## Requirement

**Engine** : Node >= v18.0

## How to Start?

1. Install Dependency

    ```bash
    npm install
    ```

2. Start DB
    
    You can use db from docker in `compose.yml` or use your own db 

3. Create `env`

    You need to create an env file in the root. For example of the env you can look from `.env.example`. The default env file name is `.env.dev`.

4. Create Migrations
    
    You need to run this migrations to create a sample db.

    ```bash
    npm run migrations:dev:gen // Generate Migrations
    npm run migrations:dev:run // Apply Migration to DB
    ```

5. Run the development 

    To run the development env, you can run this bash command.
    ```bash
    npm run local:dev:watch
    ```