pipeline {
    agent any
    
    tools {
        nodejs 'Node24' // 
    }
    environment {
        SONARQUBE = credentials('sonarqube-token') // ชื่อ Credential ของ Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/NaphatJM/simple-express-app.git'
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=mywebapp'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
