# 01_PROJECT_OVERVIEW.md

> **Document ID:** 01
>
> **Document Name:** Project Overview
>
> **Project:** AssetFlow ERP
>
> **Version:** 1.0
>
> **Status:** Architecture Locked
>
> **Owner:** Divakar (Team Lead)
>
> **Primary Audience:** Developers, Architects, AI Coding Agents, Reviewers
>
> **Depends On:** 00_README_FIRST.md
>
> **Followed By:** 02_ENGINEERING_PRINCIPLES.md

---

# Executive Summary

AssetFlow is a modern Enterprise Asset Management (EAM) platform designed to help organizations manage the complete lifecycle of physical assets—from registration and allocation to maintenance, auditing, reporting, and retirement.

The system is being developed as an architecture-first ERP application for the Odoo Hackathon. Rather than approaching the problem as a collection of CRUD pages, AssetFlow is engineered as a modular enterprise platform that emphasizes scalability, maintainability, strong database design, and workflow-driven business logic.

The project's architectural foundation is derived from our existing CTA ERP platform. Instead of starting from an empty repository, we are extracting a reusable ERP core and replacing only the apparel-specific business domain with the Asset Management domain.

This allows the team to focus on solving business problems instead of rebuilding infrastructure that has already been validated through previous ERP development experience.

---

# Vision Statement

Our vision is to build an enterprise-grade Asset Management ERP that demonstrates how real-world business systems should be engineered.

The project prioritizes:

- Business workflows over isolated screens
- Relational database design over temporary data storage
- Modular architecture over tightly coupled implementations
- Long-term maintainability over short-term feature velocity
- Engineering discipline over hackathon shortcuts

AssetFlow is intended to feel like a production-ready ERP module rather than a proof-of-concept application.

---

# Why This Project Exists

Most asset management solutions begin as inventory tracking systems.

Organizations typically maintain spreadsheets that answer only one question:

> "Where is this asset?"

However, enterprise asset management requires answering much more complex questions:

- Who currently owns the asset?
- When was it allocated?
- What approvals were required?
- Is maintenance overdue?
- Who approved the maintenance?
- Has the asset been audited?
- Who transferred it?
- What is the complete lifecycle history?
- Which department is responsible?
- Are there scheduling conflicts?
- What notifications should be triggered?

These questions cannot be solved by spreadsheets or disconnected CRUD applications.

They require structured workflows, relational data, auditability, and clearly defined business rules.

AssetFlow exists to solve these problems through an ERP-first architecture.

---

# Business Context

Every growing organization eventually reaches a point where manual asset management becomes inefficient.

Common issues include:

- Missing assets
- Duplicate allocations
- Untracked transfers
- Lack of maintenance history
- No ownership visibility
- Poor audit trails
- Resource booking conflicts
- Spreadsheet inconsistencies
- Weak reporting capabilities

These problems become increasingly expensive as organizations scale.

AssetFlow provides a centralized platform where every asset transaction becomes part of a structured business workflow.

---

# Problem Statement Analysis

The AssetFlow challenge is fundamentally an Enterprise Resource Planning problem.

The provided requirements describe several interconnected business workflows rather than isolated software features.

These workflows include:

- Organizational setup
- Asset registration
- Asset allocation
- Shared resource booking
- Asset transfers
- Asset returns
- Maintenance approval
- Audit cycles
- Reporting
- Activity tracking
- Notifications

Each workflow interacts with multiple user roles and business entities.

This naturally requires a modular ERP architecture instead of independent CRUD pages.

---

# Product Philosophy

AssetFlow is designed around the philosophy that business processes should define software architecture.

We intentionally avoid building individual screens first.

Instead, we model:

Business Process

↓

Business Rules

↓

Domain Objects

↓

Database Relationships

↓

Service Layer

↓

REST APIs

↓

User Interface

Every screen in the application is therefore a visualization of an existing business workflow.

---

# Why We Reuse the CTA ERP Architecture

This project does not begin from a blank repository.

Our team has previously developed a modular ERP platform for the apparel industry.

That platform already solved many engineering problems common to enterprise software, including:

- Layered backend architecture
- Role-based access control
- Dashboard framework
- Activity logging
- Notification system
- Modular services
- PostgreSQL integration
- Authentication
- Shared UI components
- REST API architecture

These capabilities are independent of the business domain.

Rather than rebuilding them, we reuse the architecture and replace only the business modules.

Transformation:

```text
CTA Apparel ERP
        │
        ▼
Reusable ERP Core
        │
        ▼
AssetFlow ERP
```

The architecture remains.

Only the domain changes.

---

# Why We Do Not Clone Odoo

Odoo represents mature ERP engineering practices.

However, AssetFlow is not intended to replicate Odoo.

We intentionally avoid:

- Copying UI layouts
- Copying business modules
- Copying implementation details
- Copying workflows without adaptation

Instead, we adopt the engineering principles demonstrated by enterprise ERP systems:

- Modular business domains
- Relational database modeling
- Workflow-driven architecture
- Reusable services
- State-driven business processes
- Strong auditability
- Separation of concerns

AssetFlow is therefore inspired by ERP engineering rather than by any individual product.

---

# Core Product Goals

The project aims to achieve the following engineering goals.

## Functional Goals

- Manage complete asset lifecycle
- Support multiple organizational roles
- Enable controlled allocation workflows
- Support shared resource booking
- Handle maintenance approvals
- Support audit cycles
- Generate reports
- Track every business activity

## Technical Goals

- Modular architecture
- PostgreSQL-first design
- Clean REST APIs
- Reusable service layer
- Domain separation
- High maintainability
- Enterprise UI
- Scalable data model

---

# Non-Goals

The following are intentionally outside the scope of this project.

- Recreating every ERP feature
- Building unnecessary AI functionality
- Blockchain integration
- Over-engineering deployment
- Microservices architecture
- Mobile application
- Public SaaS platform

Our focus remains solving the AssetFlow business problem exceptionally well.

---

# High-Level Business Modules

The system is divided into independent ERP modules.

```
Authentication

Organization

Assets

Allocation

Booking

Maintenance

Audit

Reports

Notifications

Dashboard

Settings
```

Each module owns its own business logic while communicating through shared services.

---

# Success Criteria

The project is considered successful if it demonstrates:

- Clean architecture
- Strong relational database design
- Workflow-driven business logic
- Modular backend
- Consistent UI
- Proper validation
- Secure authorization
- Maintainable codebase
- Production-quality engineering practices

Success is not measured by the number of features.

Success is measured by engineering quality.

---

# Repository Philosophy

Every document inside this repository exists for a specific engineering purpose.

No markdown file should duplicate another.

Each document has a single responsibility.

Together they form a complete engineering handbook for the project.

Every AI coding agent and every developer must treat these documents as the project's source of truth.

---

# What Comes Next

This document defines **why** the project exists.

The next document defines **how engineering decisions are made**.

➡ **Next:** `02_ENGINEERING_PRINCIPLES.md`