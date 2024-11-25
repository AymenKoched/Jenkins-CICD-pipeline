#!groovy

pipeline {
    agent {
        label 'nodejs-agent'
    }

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        DOCKER_IMAGE = 'aymenkoched02/pipeline-demo'
        DOCKER_NETWORK_NAME = 'pipeline-demo-network'
        JOB_NAME = 'Pipeline demo deployment 🚀 🌎'
    }

    stages {
        stage('Init') {
            steps {
                script {
                    env.CI = true
                    env.BRANCH = env.CHANGE_BRANCH ?: env.BRANCH_NAME
                    env.IS_MASTER = env.BRANCH == 'master'
                }
                sh "env"
                sh "whoami"
            }
        }

        stage('Install dependencies') {
            steps {
                sh "yarn install --immutable"
            }
        }

        stage('Lint and Build') {
            parallel {
                stage('Lint') {
                    steps {
                        sh "yarn lint"
                    }
                }
                stage('Build') {
                    steps {
                        sh "yarn build"
                    }
                }
            }
        }

        stage('Run Tests') {
            steps {
                sh "yarn test"
            }
        }

        stage('Dockerize services') {
            matrix {
                axes {
                    axis {
                        name 'SERVICE'
                        values 'service-demo'
                    }
                }
                stages {
                    stage('Build & publish image') {
                        steps {
                            script {
                                sh """
                                    docker build \
                                    --build-arg SERVICE=${SERVICE} \
                                    -t ${DOCKER_IMAGE}:${SERVICE}-${BUILD_NUMBER} \
                                    .

                                    echo ${DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${DOCKER_HUB_CREDENTIALS_USR} --password-stdin
                                    docker push ${DOCKER_IMAGE}:${SERVICE}-${BUILD_NUMBER}
                                    docker logout
                                """
                            }
                        }
                    }
                }
            }
        }

        stage('Deploy services') {
            matrix {
                axes {
                    axis {
                        name 'SERVICE'
                        values 'service-demo'
                    }
                }
                stages {
                    stage('Pull and Deploy') {
                        steps {
                            script {
                                sh "docker pull ${DOCKER_IMAGE}:${SERVICE}-${BUILD_NUMBER}"

                                sh "docker stop ${SERVICE}-container || true"

                                sh "docker rm ${SERVICE}-container || true"

                                sh """
                                    docker run -d \
                                    --name ${SERVICE}-container \
                                    --network ${DOCKER_NETWORK_NAME} \
                                    -e IS_DOCKER=true \
                                    -p 3000:3000 \
                                    ${DOCKER_IMAGE}:${SERVICE}-${BUILD_NUMBER}
                                """
                            }
                        }
                    }
                }
            }
        }
    }

    post {
        cleanup {
            echo 'Cleaning up'
            deleteDir()
        }
    }
}