## Awesome Project with TypeORM

Steps to run this project:

1. Copy .env.example to .env
```bash
cp .env.example .env
```
2. Supply the following variables required.
```
SERVER_PORT=6123

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=nodeserver
DATABASE_PASS=toor
DATABASE_NAME=node_server
DATABASE_LOGGING=true

SECRET=123
```
3. Install dependencies
```bash
yarn install
```

4. Run DB migration script.

```bash
yarn typeorm migration:run -d ./src/data-source.ts
```

5. Run development mode
```bash
yarn start
```

6. If you are done developing, build the project, a dist folder will be generated.
```bash
tsc --skipLibCheck
```