pipeline {
    agent any
    stages {
        stage('Cleanup') {
              steps {
                   sh 'rm -rf crm-api/target || true'
            }
       }
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/MaksimLutlouski/projetCRM.git'
            }
        }
        stage('Build API') {
            steps {
                dir('crm-api') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        stage('Check JAR File') {
            steps {
                script {
                    sh 'ls -lh crm-api/target/'
                }
            }
        }
        stage('Build Frontend') {
            steps {
                script {
                    sh 'npm install && npm run build'
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
