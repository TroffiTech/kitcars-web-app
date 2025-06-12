# Next project for TROFFI

It realise headless web-sites architecture, updating stores content from WC databases.

## Features

1. Fetching and caching stores data from WC databases
2. Updates scheduling by Versel cron tasks
3. Displaying variabel content as tels, addresses, etc., using .env variables
4. Recieving lids to bitrix

## Environment

1. node v18.19.1
2. npm v9.2.0

### Environment variables list

place .env file in root directory

NEXT_PUBLIC_YNDEX_MAP_URL
NEXT_PUBLIC_CITY_LOCATION
NEXT_PUBLIC_DOMEN
NEXT_PUBLIC_MAIN_TEL
NEXT_PUBLIC_SITE_NAME
NEXT_PUBLIC_ADDRESS
BITRIX_KEY
UPDATE_PASSWORD
DB_URL
WC_KEY
WC_SECRET
FIRST_MANAGER_TEL
FIRST_MANAGER_NAME
FIRST_MANAGER_EMAIL
SECOND_MANAGER_TEL
SECOND_MANAGER_NAME
SECOND_MANAGER_EMAIL
