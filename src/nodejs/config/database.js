module.exports = {
    dimPool: {
        user: "dim",
        password: 'dimdb',
        connectString: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = odadc3-scan)(PORT = 1521)) (CONNECT_DATA = (SERVICE_NAME = ORADIM.chrul.net)))",
        poolMin: 10,
        poolMax: 10,
        poolIncrement: 0
    }
  };