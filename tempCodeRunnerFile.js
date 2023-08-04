const express = require('express');
const { json, urlencoded } = require('express');
const { serve, setup } = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const helmet = require('helmet');
const cors = require('cors');