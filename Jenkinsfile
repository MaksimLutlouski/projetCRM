pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/MaksimLutlouski/projetCRM'
            }
        }
        stage('Build API') {
            steps {
                script {
                    sh 'cd backend && mvn clean package -DskipTests'
                }
            }
        }
        stage('Check JAR File') {
            steps {
                script {
                    sh 'ls -lh backend/target/'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    sh 'cd frontend && npm install && npm run build'
                }
            }
        }
        stage('Docker Compose Up') {
            steps {
                script {
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
}
