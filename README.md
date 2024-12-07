# TPLT | Web SPA Template

This template provides a React project with minimal setup with a CI/CD pipeline preconfigured.

## Setting up CD

The CD pipeline is handled by Pulumi, the configuration for which can be found with the iac project.

1. Create an S3 bucket in AWS. This will be used as the Pulumi backend.
2. Provide AWS environment variables (these can be found in bitwarden under AWS Credentials)
3. Login to the Pulumi backend `pulumi login "s3://<bucket name including region>"`
4. Navigate to Pulumi.yaml and update the project name
5. Depending on the environment you want to build in, either update the values in Pulumi.dev.yaml, or create a new environment stack with corresponding yaml file. `pulumi stack init`
6. `pulumi up` (the pass phrase can be found in bitwarden under pulumi)

## Setting up CI

The CI pipeline is handled by Jenkins, the configuration for which can be found in pipeline/Jenkinsfile.

1. Create a multi-branch pipeline which points to the GitHub repository
2. In GitHub, setup a webhook which calls http://81.109.142.168:8080/multibranch-webhook-trigger/invoke?token=<unique_token>.
3. In Jenkins, add webhook scanning to the project using the unique_token
