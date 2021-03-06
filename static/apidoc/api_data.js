define({ "api": [
  {
    "type": "post",
    "url": "/api/account-trust",
    "title": "",
    "description": "<p>Change trust for account.</p>",
    "name": "ChangeTrust",
    "group": "Account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "account.publicKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "account.secret",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "assetIds",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/api/account-allow",
    "title": "",
    "description": "<p>issuer authorize an account for specified account.</p>",
    "name": "ChangeTrust",
    "group": "Account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issuerSecret",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "trustorPublicKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assetIds",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/api/account",
    "title": "",
    "description": "<p>Create an account for BaaS, this account can be used as Producer, Middleman or final consumer.</p>",
    "name": "CreateAccount",
    "group": "Account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "if",
            "description": "<p>activate this account after creation</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/api/account-auth",
    "title": "",
    "description": "<p>Set the account require auth as a issuer account.</p>",
    "name": "RequireAuthForAccount",
    "group": "Account",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "accountSecret",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Account"
  },
  {
    "type": "post",
    "url": "/api/product-purchase",
    "title": "",
    "description": "<p>Brand send product to middleman.</p>",
    "name": "ChangeTrust",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "brand",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "middleman",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "assets",
            "description": "<p>An array of assets information, [{asset: asset, amount:1, memo: 'cav31aazxc'},...]</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/product-sale",
    "title": "",
    "description": "<p>Middleman send product to customer.</p>",
    "name": "ChangeTrust",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "middleman",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "customer",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "assets",
            "description": "<p>An array of assets information, [{asset: asset, amount:1, memo: 'cav31aazxc'},...]</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/product",
    "title": "",
    "description": "<p>Create an account for BaaS, this account can be used as Producer, Middleman or final consumer.</p>",
    "name": "ProduceProducts",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "boolean",
            "optional": false,
            "field": "if",
            "description": "<p>activate this account after creation</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issuingAccount.publicKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issuingAccount.secret",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receivingAccount.publicKey",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "receivingAccount.secret",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assetSymbol",
            "description": "<p>the symbol length should be extactly 3</p>"
          },
          {
            "group": "Parameter",
            "type": "int",
            "optional": false,
            "field": "quantity",
            "description": "<p>how many product should be produced(must be greater than 0).</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "memo",
            "description": ""
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Product"
  },
  {
    "type": "post",
    "url": "/api/product-trans",
    "title": "",
    "description": "<p>Transfer asset from one account to another, it must changeTrust before this operation.</p>",
    "name": "Transfer",
    "group": "Product",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "from",
            "description": "<p>key pair of from address, which is generate by StellarSdk.Keypair.fromSecret(s)</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "to",
            "description": "<p>key pair of destination address</p>"
          },
          {
            "group": "Parameter",
            "type": "object",
            "optional": false,
            "field": "assets",
            "description": "<p>An array of assets information, [{asset: asset, amount:1, memo: 'cav31aazxc'},...]</p>"
          }
        ]
      }
    },
    "version": "1.0.0",
    "filename": "./server.js",
    "groupTitle": "Product"
  },
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "./apidoc/main.js",
    "group": "_home_ymg_Develop_BaaS_api_apidoc_main_js",
    "groupTitle": "_home_ymg_Develop_BaaS_api_apidoc_main_js",
    "name": ""
  }
] });
