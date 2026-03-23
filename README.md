# Titanbay Private Markets API
A RESTful backend service for managing private market funds and investor commitments. This project was built as part of the Titanbay Software Engineering Take-Home Task.

## Quick Start
> To ensure this application can be run locally with minimal setup, a Docker configuration is provided for the database.
1. **Clone the repository**:
```bash
git clone https://github.com/panosprvo/titan-bay-task.git
cd titan-bay-task
```

2. **Environment Setup**:
 - Copy `.env.example` to `.env`. The default `DATABASE_URL` is pre-configured to talk to the Docker container.

3. **Launch Database**:
```
docker-compose up -d
```

4. **Install & Initialise**:
```
npm install
npx prisma db push
npx prisma db seed
```

5. **Run the API**:
```
npm run dev
```

The serve will start at http://localhost:3000. You can verify the status at [http://localhost:3000/health](http://localhost:3000/health).

6. **Run tests**
```
npm test
```

## Tech Stack

- Language/Framework: Typescript with Express.js.
- Database: PostgreSQL (with Prisma ORM).
- Validation: Zod for robust input validation and error handling (done only for the funds schema to stay within the time limit of this task).
- Infrastructure: Docker for local development environment.

## API Documentation
This API implements 8 endpoints as defined in the [Titanbay API Specification](https://storage.googleapis.com/interview-api-doc-funds.wearebusy.engineering/index.html).
- Funds: List, Create, Update, and Get specific funds.
- Investors: List and Create investors.
- Investments: List and Create investments for specific funds.

## Design Decisions & AI Collaboration 
As per Titanbay's guidelines and engineering values, this project was developed with the assistance of AI tools (Google Gemini)
to enhance productivity and code quality. All AI-generated code was reviewed and tested by the developer to ensure it meets
the project's requirements and standards.

Key Technical Decisions:
- Modern ESM Architecture: Configured the project with Node.js ES Modules ("type": "module") and a custom ts-node/esm loader to stay aligned with current industry standards.
- Relational Integrity: Designed a many-to-many relationship using a join table (Investment) to allow multiple investors per fund and multiple funds per investor, ensuring data normalization.
- Validation Gatekeeping: Implemented a global `validate()` middleware using Zod. This ensures that malformed UUIDs, invalid Enums (like FundStatus), or incorrect date formats are rejected before they ever reach the database.
- Global Error Handling: Built a centralized error middleware to catch and translate Prisma-specific errors into clean, spec-compliant JSON responses.

In more detail, AI tools were utilized for:
- Boilerplate and scaffolding code generation (e.g., setting up Express routes, Prisma models).
- Schema design (the most efficient many-to-many relationship structure for Funds and Investors).
- Testing (to generate edge-case unit tests to ensure robustness within the 2-3 hour time window).

Assumptions:
* **Strict Input Validation**: While the specification did not explicitly define "Required" vs "Optional" fields, I assumed that core entity attributes (e.g., `name`, `vintage_year`, `target_size_usd` for Funds) are **mandatory**.
* **Data Integrity**: I implemented manual checks and Zod schemas to ensure no "empty" entities can be created, returning a `400 Bad Request` if required fields are missing.
* **UUID Standards**: I assumed the use of UUID v4 for all primary keys to ensure global uniqueness and prevent ID enumeration attacks.
* **Currency Handling**: `Decimal` types were used for all financial fields (USD) within the database to prevent the precision errors associated with floating-point math in financial applications.
* **Test Environment**: For the scope of this task, integration tests run against the local Docker PostgreSQL instance. I have implemented basic cleanup hooks in the test suite to minimize data pollution, though in a production CI/CD environment, I would recommend a dedicated, ephemeral test database.

### Security Note:
I have included default credentials in the `.env.example` and `docker-compose.yml` specifically to facilitate a 'one-click' setup for this technical task.
However, in a production environment, these would be managed via a secure secret management service and never committed to version control.

## Checklist
- [X] All endpoints working correctly.
- [X] Proper database relationships and constraints.
- [X] Unit and integration tests for the funds controller.
- [X] Graceful handling of errors.
- [X] Accessed API endpoints and verified responses with Postman.
