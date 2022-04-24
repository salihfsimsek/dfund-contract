# DFund - Near Protocol

# Models

## Company

| Name           | Type   |
| -------------- | ------ |
| id             | u32    |
| owner          | string |
| name           | string |
| description    | string |
| logo           | string |
| promoVideo     | string |
| employeeNumber | u32    |
| neededMoney    | u128   |
| totalMoney     | u128   |

# Build and devDeploy

```ts
yarn deploy-contract-dev
export CONTRACT=<AccountId>
echo $CONTRACT
```

Creating Company

```ts
near call $CONTRACT create '{"name": "First company", "logo": "logo", "description": "description", "promoVideo":"videolink", "employeeNumber":12, "neededMoney":"15","totalMoney":"0"}' --accountId <AccountId>
```

Updating Company

```ts
near call $CONTRACT update '{"companyId":<companyId>,"name": "First company", "logo": "logo", "description": "description", "promoVideo":"videolink", "employeeNumber":13}' --accountId <AccountId>
```

Deleting Company

```ts
near call $CONTRACT del '{"companyId": <companyId>}' --accountId <AccountId>
```

Getting Company

```ts
near view $CONTRACT getById '{"companyId": <companyId>}' --accountId <AccountId>
```

Getting Companies

```ts
near view $CONTRACT getCompanies '{}' --accountId <AccountId>
```

Funding the Company

```ts
near call $CONTRACT fundTheCompany '{"companyId":<companyId>}' --deposit <attach some near> --accountId <AccountId>
```
