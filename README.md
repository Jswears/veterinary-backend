# [VetApp](https://vetappwecare.netlify.app/) (Server)

<br>

## Description

A veterinary App for easier communication with your Vet.
<br>

## Models

User model

```
fullname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    role: {
      type: String,
      enum: ["admin", "customer"],
      default: "customer",
    },
```

Pet model

```
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    specie: {
      type: String,
      enum: ["dog", "cat", "turtle", "rabbit"],
    },
    image: {
      type: String,
    },
    customerId:
    {
        type: Schema.ObjectId,
        ref: 'User'
    }
```

Feedback model

```
    medicalHistory: {
      type: String,
      required: true,
      trim: true,
    },
    terapy: {
      type: String,
      trim: true,
    },
    tips: {
      type: String,
      trim: true,
    },
    customerId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    formId: {
      type: Schema.ObjectId,
      ref: "Form",
    },
    read: {
      type: Boolean,
      default: false,
    }
```

Form model

```
     request: {
      type: String,
      required: true,
      trim: true,
    },
    customerId:
    {
        type: Schema.ObjectId,
        ref: 'User'
    },
    petId:
    {
        type: Schema.ObjectId,
        ref: 'Pet'
    },
    read:{
        type: Boolean,
        default: false
    }
```

Complaint model

```
    complaint: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    petId: {
      type: Schema.ObjectId,
      ref: "Pet",
    },
    read: {
      type: Boolean,
      default: false,
    }
```

Medication model

```
    medName: {
      type: String,
      trim: true,
      required: true,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    price: {
      type: Number,
    },
    image: {
      type: String,
    }
```

## API Endpoints/Backend Routes

- POST /auth/signup
  - body:
    - fullname
    - email
    - password
- POST /auth/login
  - body:
    - email
    - password
- GET /auth/verify
- POST /user/new-pet
  - body:
    - name
    - age
    - specie
    - customerId
    - image
- GET /user/your-pets/:customerId
- GET /user/one-pet/:id
- PUT /user/one-pet/:id
- DELETE /user/one-pet/:id
- POST /user/new-form
  - body:
    - request
    - customerId
    - petId
- GET /user/your-forms
  - body:
    - customerId
- GET /user/feedbacks/:customerId
- GET /user/feedback/:feedbackId
- POST /user/complaint
  - body:
    - complaint
    - customerId
    - petId
- GET /user/medication
- GET /user/medication/:medId
- POST /user/medication/create-payment-intent
  - body:
    - items
- GET /admin/all-forms
- GET /admin/all-pets
- GET /admin/all-feedback
- GET /admin/form/:formId
- PATCH /admin/form/:formId
- GET /admin/feedback/:feedbackId
- POST /admin/new-feedback
  - body:
    - medicalHistory
    - terapy
    - tips
    - customerId
    - formId
- PATCH /admin/feedback/:id
- PUT /admin/edit-feedback/:feedbackId
  - body:
    - medicalHistory
    - terapy
    - tips
    - customerId
    - formId
- DELETE /admin/feedback/:feedbackId
- GET /admin/all-complaints
- PATCH /admin/complaint/:complaintId
- GET /admin/all-customers
- DELETE /admin/customer/:id
- POST /admin/medication
  - body:
    - medName
    - amount
    - description
    - price
    - image
- PUT /admin/one-medication/:id
- DELETE /admin/one-medication/:id

<br>

## Links

### Git

[Repository Link](https://github.com/Jswears/veterinary-backend)

[Deploy Link](https://vetapp.adaptable.app/)

### Collaborators

[Joaquin Swears Salinas](https://github.com/Jswears)

[Nicola Pasa](https://github.com/nicolapasa)

[Andrej Delinac](https://github.com/Jerdnaa)

### Slides

[Google Slides Link]
