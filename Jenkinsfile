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
        stage('Docker Compose Up') {
            steps {
                script {
                    sh 'docker-compose up --build -d'
                }
            }
        }
    }
}

