#!/usr/bin/env bash
echo "** Creating DB"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -d "$POSTGRES_DB"  <<-EOSQL
      CREATE DATABASE order;
      CREATE DATABASE delivery;
EOSQL

echo "** Finished creating default DB"