#!/bin/bash

# Set variables
AWS_PROFILE="wedding-backend"
AWS_REGION="ap-southeast-1"
ECR_REPO="wedding-backend"
IMAGE_TAG="test-env"

echo "🔧 Building test container image..."
docker build -t $ECR_REPO:$IMAGE_TAG .

echo "🔐 Logging into ECR..."
aws ecr get-login-password --profile $AWS_PROFILE --region $AWS_REGION | docker login --username AWS --password-stdin $(aws sts get-caller-identity --profile $AWS_PROFILE --query 'Account' --output text).dkr.ecr.$AWS_REGION.amazonaws.com

echo "🏷️ Tagging image for ECR..."
ECR_URI=$(aws ecr describe-repositories --profile $AWS_PROFILE --region $AWS_REGION --repository-names $ECR_REPO --query 'repositories[0].repositoryUri' --output text)
docker tag $ECR_REPO:$IMAGE_TAG $ECR_URI:$IMAGE_TAG

echo "📤 Pushing image to ECR..."
docker push $ECR_URI:$IMAGE_TAG

echo "✅ Test container image pushed successfully!"
echo "Image URI: $ECR_URI:$IMAGE_TAG"
