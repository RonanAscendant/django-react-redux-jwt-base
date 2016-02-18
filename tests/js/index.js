const testsContext = require.context('./', true, /\.spec(s)\.js$/);
testsContext.keys().forEach(testsContext);
