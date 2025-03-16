pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/MaksimLutlouski/projetCRM'
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t mon-app:latest .'
                }
            }
        }
        stage('Stop Existing Container') {
            steps {
                script {
                    sh 'docker stop JenkinsDeploy || true'
                    sh 'docker rm JenkinsDeploy || true'
                }
            }
        }
        stage('Run Container') {
            steps {
                script {
                    sh 'docker run -d --rm -p 8080:8080 --name JenkinsDeploy mon-app'
                }
            }
        }
    }
}
