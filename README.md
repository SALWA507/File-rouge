# BioMaintenix

### La technologie au service de la maintenance biomédicale

BioMaintenix est une plateforme web de **GMAO** destinée aux cliniques et laboratoires.

Elle permet de gérer les équipements biomédicaux, les maintenances, les interventions, les demandes et les alertes.

---

## Fonctionnalités

* Authentification et gestion des rôles
* Gestion des équipements
* Gestion des maintenances
* Gestion des interventions
* Gestion des demandes
* Gestion des alertes
* Gestion des utilisateurs
* Rapports et statistiques
* Gestion du profil utilisateur

---

## Rôles

| Rôle       | Fonction                              |
| ---------- | ------------------------------------- |
| Admin      | Gestion globale de la plateforme      |
| Technicien | Maintenances et interventions         |
| Personnel  | Consultation et création des demandes |

---

## Technologies

**Backend**

* PHP
* Laravel
* Laravel Sanctum
* MySQL

**Frontend**

* React
* Vite
* JavaScript
* Axios

**Outils**

* Docker
* Git / GitHub
* Postman
* Figma
* VS Code

---

## Architecture

```text
Frontend React
      ↓
   REST API
      ↓
Backend Laravel
      ↓
     MySQL
```
---

## Docker Hub

Les images Docker du projet sont disponibles sur Docker Hub :

* **Backend Laravel** : [BioMaintenix Backend](https://hub.docker.com/repository/docker/amzane/biomaintenix-backend/general?utm_source=chatgpt.com)
* **Frontend React** : [BioMaintenix Frontend](https://hub.docker.com/repository/docker/amzane/biomaintenix-frontend/general?utm_source=chatgpt.com)

Les images permettent de déployer séparément le backend Laravel et le frontend React du projet.

## Structure du projet

```text
BioMaintenix/
│
├── backend/
├── frontend/
├── docs/
│   ├── screenshots/
│   └── diagrams/
│
├── docker-compose.yml
└── README.md
```

---

# Diagrammes

Les diagrammes du projet sont regroupés dans :


## Diagramme de cas d'utilisation

![Diagramme de cas d'utilisation](docs/diagrams/use-case.png)
## Diagramme de classes

![Diagramme de classes](docs/diagrams/class-diagram.png)
## Diagramme de base de données

![Diagramme de base de données](docs/diagrams/ERD.png)

## Installation

### Backend

```bash
cd backend
composer install
php artisan key:generate
```

### Frontend

```bash
cd frontend
npm install
```

### Docker

Depuis la racine :

```bash
docker compose up -d
```


## Auteure

**Salwa Amzane**

Développeuse Web Full Stack

Projet réalisé dans le cadre de **ENAA Bootcamp**.

---

### BioMaintenix

**La technologie au service de la maintenance biomédicale.**
