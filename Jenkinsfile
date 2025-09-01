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
                git branch: 'feature', url: 'https://github.com/NaphatJM/simple-express-app.git'
                echo "Checked out branch: feature"
            }
        }

        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('SonarQube Scan') {
            steps {
                withSonarQubeEnv('sonarqube') {
                    sh 'npx sonar-scanner -Dsonar.projectKey=express-app'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
