# React Native Clean Architecture (Feature-based)

A **practical, scalable Clean Architecture** for React Native projects, organized **feature-first** with **only 3 layers**:

> **presentation / domain / data**

This architecture is battle-tested for large RN apps (Super App, Fintech, Banking) while staying **simple enough for daily development**.

---

## 🎯 Goals

* Clear separation of concerns
* Scalable feature development
* Business logic independent from UI & frameworks
* Easy testing and refactoring
* Avoid over‑engineering

---

## 🧱 Core Concept

Each **feature** owns its full vertical slice:

```
src/features/<feature>/
  presentation/   # UI + State + ViewModel
  domain/         # Business rules
  data/           # API & persistence
```

No cross-feature imports. No shared god-modules.

---

## 🧭 Dependency Rule (Most Important Rule)

```
Presentation → Domain ← Data
```

✅ Presentation **depends on** Domain
✅ Data **depends on** Domain (via interfaces)
❌ Domain **depends on nothing**

Violating this rule breaks Clean Architecture.

---

## 🗂️ Feature Folder Structure

Example: `hui` feature

```
features/hui/
├── presentation/
│   ├── screens/
│   ├── viewmodels/
│   ├── state/
│   │   ├── hui.slice.ts
│   │   ├── hui.saga.ts
│   │   └── hui.selectors.ts
│   └── components/
│
├── domain/
│   ├── entities/
│   │   └── Hui.ts
│   └── usecases/
│       ├── createHui.ts
│       └── index.ts
│
└── data/
    ├── dto/
    ├── mappers/
    ├── datasources/
    └── repositories/
```

---

## 🎨 Presentation Layer

**Responsibility:** UI & UI state

Contains:

* Screens (React Native components)
* ViewModels (hooks)
* Redux / Saga / Context
* UI-only logic

Rules:

* ❌ No API calls
* ❌ No business rules
* ✅ Calls **usecases** only

```ts
// presentation/state/hui.saga.ts
import { huiUsecases } from '../../domain/usecases';

function* createHuiSaga(action) {
  const entity = yield call(huiUsecases.createHui, action.payload);
  yield put(createSucceeded(entity.huiId));
}
```

---

## 💼 Domain Layer (The Core)

**Responsibility:** Business logic

Contains:

* Entities (business models)
* Usecases (business flows)

Rules:

* ❌ No React / Redux / Axios
* ❌ No API knowledge
* ✅ Pure TypeScript
* ✅ Fully testable

```ts
// domain/usecases/createHui.ts
export interface HuiRepository {
  create(input: CreateHuiInput): Promise<Hui>;
}

export const createHui = (repo: HuiRepository) => async (input) => {
  if (input.amount <= 0) throw new Error('Invalid amount');
  return repo.create(input);
};
```

---

## 🔌 Data Layer

**Responsibility:** Data access

Contains:

* API calls
* Local storage
* DTO ↔ Entity mapping

Rules:

* ❌ No UI imports
* ❌ No business decisions
* ✅ Implements repository interfaces

```ts
// data/repositories/huiRepository.ts
export const huiRepository: HuiRepository = {
  async create(input) {
    const dto = await huiApi.create(input);
    return huiMapper.toDomain(dto);
  },
};
```

---

## 🔄 Data Transformation Flow (Mandatory)

```
API DTO (snake_case)
  ↓
Mapper
  ↓
Domain Entity (camelCase)
  ↓
Usecase
  ↓
Saga / ViewModel
  ↓
Presentation State
```

🚫 Never expose DTOs outside `data/`.

---

## 🔁 Full Runtime Flow

```
User Action
  → Screen
  → ViewModel
  → Redux Action
  → Saga
  → Usecase (Domain)
  → Repository (Data)
  → API
  → Mapper → Entity
  → Saga
  → Reducer
  → UI Update
```

---

## 🧠 State Management Rules

| Use case               | Solution           |
| ---------------------- | ------------------ |
| Global / cross-feature | Redux              |
| One flow (wizard)      | Context / Provider |
| UI-only                | Local state        |

State management is **presentation detail**, not domain concern.

---

## 🚫 Common Anti‑Patterns

### ❌ Saga importing API or Repository

```ts
import { huiApi } from '../../data/datasources'; // WRONG
```

### ❌ Business logic in UI or Saga

```ts
if (amount <= 0) alert('Invalid'); // WRONG
```

### ❌ Domain importing framework

```ts
import axios from 'axios'; // WRONG
```

---

## 🧪 Testing Strategy

* **Domain**: unit tests (mandatory)
* **Data**: integration tests (API mapping)
* **Presentation**: behaviour tests
* **E2E**: only critical flows

Clean Architecture makes testing cheap and focused.

---

## ⚖️ Clean but Not Overkill

Apply **by importance**:

* Core domains (Finance, Payment, Loan): full 3 layers
* Simple/support features: lighter structure allowed

Architecture should **accelerate delivery**, not slow it down.

---

## ✅ Checklist for New Feature

* [ ] Feature folder created
* [ ] 3 layers respected
* [ ] Domain has no framework imports
* [ ] Saga calls usecase only
* [ ] DTOs mapped to entities
* [ ] Business rules tested

---

## 🏁 Summary

* Feature-first
* 3 layers only
* Domain is king
* Dependencies flow inward
* Simple rules, strong guardrails

This structure scales from **1 dev to 50 devs** without collapsing.

Happy building 🚀
