# Microservices Progress Notes

This document records the work completed so far inside the `microservices` folder in the order the tasks were done. The sequence below is based on the Git commit history and the current project structure.

## Project Scope

The `microservices` folder currently contains two service-level projects:

- `api-gateway`
- `identity-service`

The main development progress so far has happened inside `identity-service`, while `api-gateway` has been initialized but not yet implemented beyond setup.

## Task 1: Initial Microservices Architecture Setup

**Commit:** `26ce0d0`  
**Date:** June 7, 2026  
**Message:** `microservices architecture`

### What was done

The base microservices structure was created. Two separate Node.js services were initialized:

- `microservices/api-gateway`
- `microservices/identity-service`

Each service received its own `package.json` and `package-lock.json`, which means both services were set up as independent Node.js applications with their own dependencies.

### Files introduced

- `microservices/api-gateway/package.json`
- `microservices/api-gateway/package-lock.json`
- `microservices/api-gateway/src/server.js`
- `microservices/identity-service/package.json`
- `microservices/identity-service/package-lock.json`

### Technical significance

This was the foundation step for the whole folder. Instead of building everything in one backend, the work started with a microservices layout where:

- the API gateway is intended to handle request routing and shared gateway concerns
- the identity service is intended to handle authentication and user identity logic

### Current observation

The gateway server file exists, but `microservices/api-gateway/src/server.js` is still empty at the moment. This means the architecture has been scaffolded, but the gateway logic is still pending.

## Task 2: User Schema Creation in Identity Service

**Commit:** `5f50071`  
**Date:** June 9, 2026  
**Message:** `user-schema created`

### What was done

The first real business logic was added to the identity service by creating the user model and establishing the identity service server entry file.

### Files introduced or updated

- `microservices/identity-service/src/models/user.js`
- `microservices/identity-service/src/server.js`
- `microservices/identity-service/package.json`
- `microservices/identity-service/package-lock.json`
- `microservices/identity-service/.env` (later removed)

### Details of the user model

The `User` model was created with Mongoose and includes:

- `username`
- `email`
- `password`
- `createdAt`

The schema also includes:

- unique constraints for `username` and `email`
- trimming for text fields
- lowercasing for email
- timestamps support

### Security-related work done here

Password hashing support was added using `argon2`. The schema contains:

- a `pre('save')` hook for hashing passwords
- a `comparePassword` method for verifying login credentials later

### Technical significance

This was the first major backend data model for authentication. It established:

- how user accounts will be stored
- how passwords will be protected
- how future login and registration features can rely on a common user entity

### Current observation

The file `microservices/identity-service/src/server.js` currently exists but is empty, so the application entry point has been created structurally, but server bootstrapping is not yet implemented.

## Task 3: Environment Cleanup and Git Ignore Protection

**Commit:** `a2ce75e`  
**Date:** June 9, 2026  
**Message:** `add gitignore`

### What was done

The tracked `.env` file inside `identity-service` was removed from version control.

### Why this matters

This was an important cleanup step because environment files usually contain sensitive values such as:

- database URLs
- JWT secrets
- service credentials

Keeping `.env` out of git is a standard backend security practice.

## Task 4: Add Git Ignore Files and Start Logger Utility

**Commit:** `161e3e8`  
**Date:** June 9, 2026  
**Message:** `add gitignore files and logger utility`

### What was done

Git ignore protection was formalized and the logging utility structure was introduced.

### Files introduced or updated

- `microservices/.gitignore`
- `microservices/identity-service/.gitignore`
- `microservices/identity-service/src/utils/logger.js`

### Ignore rules added

The root `microservices/.gitignore` currently ignores:

- `node_modules`
- `*.log`
- `.env`

The service-level `.gitignore` inside `identity-service` ignores:

- `.env`

### Technical significance

This step improved project hygiene and prepared the codebase for safer development by:

- preventing dependency folders from being committed
- preventing environment secrets from being committed
- preventing generated log files from polluting the repository

It also created the placeholder for a reusable logger utility, which prepared the project for structured logging rather than plain `console.log` usage.

## Task 5: Implement Logger Utility with Winston

**Commit:** `851f3af`  
**Date:** June 14, 2026  
**Message:** `add logger utility using winston`

### What was done

The logger placeholder was turned into an actual logging implementation using `winston`.

### Current logger capabilities

Based on the current `src/utils/logger.js`, the logger now supports:

- environment-based log level selection
- timestamped logs
- structured error formatting
- JSON-formatted file logging
- colored console output
- service metadata tagging with `identity-service`

### Output targets

The logger writes to:

- console
- `error.log`
- `combined.log`

### Technical significance

This was a strong backend engineering step because it introduced:

- centralized logging
- better debugging support
- better production readiness
- a way to trace identity-service activity more consistently

## Task 6: Error Handling Middleware and Refresh Token Model

**Commit:** `54638fe`  
**Date:** June 15, 2026  
**Message:** `implement logger utility with error handling and refresh token model`

### What was done

The identity service was extended with:

- a reusable error-handling middleware
- a refresh token data model
- a more complete logger implementation

### Files introduced

- `microservices/identity-service/src/middleware/errorHandler.js`
- `microservices/identity-service/src/models/refreshToken.js`

### Refresh token model details

The refresh token schema includes:

- `token`
- `user`
- `expiresAt`

It also defines:

- a reference to the `User` model
- uniqueness for the token field
- a TTL index on `expiresAt`

### Why this matters

This step shows the project started moving beyond basic user storage and toward an authentication flow that can support:

- session continuation
- token rotation
- controlled expiration of refresh tokens

The TTL index is especially useful because expired tokens can be cleaned automatically by MongoDB.

### Error handling work

An error middleware file was added so that request-processing errors can be handled in one place instead of repeating response logic in every route handler.

### Current observation

The current `errorHandler.js` structure is present, but it still looks incomplete or needs refinement:

- it imports `logger` using `require('logger')`, which likely should point to the local utility path
- it returns a basic JSON error response, but integration with the server is not visible yet because the server file is still empty

## Task 7: User Registration Validation and Controller Logic

**Commit:** `5f5abdd`  
**Date:** June 20, 2026  
**Message:** `add user registration and validation functionality`

### What was done

The project moved into request-level authentication features by adding:

- a registration controller
- input validation logic

### Files introduced

- `microservices/identity-service/src/controller/identity-controller.js`
- `microservices/identity-service/src/utils/validator.js`

### Validation work

The validation layer was designed to check registration input for:

- `username`
- `email`
- `password`

This is an important step because it protects the service from invalid user input before database operations are attempted.

### Controller work

The registration controller currently:

- imports the logger
- imports registration validation
- logs when the registration endpoint is hit
- validates `req.body`
- returns a `400` response when validation fails

### Technical significance

This commit marks the transition from only defining models and utilities to actually handling incoming authentication requests.

It introduced the beginning of the registration flow, which is typically one of the first real endpoints in an identity service.

### Current observation

The registration flow is started but not finished yet. Based on the current code:

- user creation logic is not implemented yet
- success response logic is not implemented yet
- the `catch` block is empty
- the validator implementation currently defines `Schema` but returns `schema.validate(data)`, which looks inconsistent
- `validator.js` exports `{ validateRegistration }`, while the controller imports it as a direct function, so the import/export alignment may still need correction

## Current Overall State of the Microservices Folder

### Completed areas

- microservices folder structure created
- separate `api-gateway` and `identity-service` services created
- package setup for both services completed
- user model created with hashing support
- git ignore protection added
- structured logging utility added
- refresh token model created
- error handling middleware introduced
- registration validation and controller scaffolding started

### Work that appears partially complete or pending

- `api-gateway/src/server.js` is still empty
- `identity-service/src/server.js` is still empty
- registration controller is only partially implemented
- validator/controller integration likely needs correction
- error middleware likely needs local import correction and server integration
- no visible route wiring is present yet
- no visible database connection bootstrap is present yet

## Short Summary

So far, the work in `microservices` has followed a sensible backend progression:

1. create the microservices structure
2. set up the identity service foundation
3. secure configuration handling with gitignore
4. add logging support
5. add refresh-token and error-handling infrastructure
6. begin the user registration flow with validation and controller logic

Overall, this is a solid early-stage authentication microservice setup. The project has a clear structure and the main next phase would likely be wiring the server, routes, database connection, and finishing the registration and login flow.
