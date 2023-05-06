# BACKEND OF LOGKEEPER APP

## To run the entire app

- Execute Mysql commands to get exactly the same database
- Install modules with npm install
- Run node database.js command

## Completed features

- Established connection with database
- Get woodpiles route that sends back list of all woodpiles with relations to the project
- Send logs route - creates new measurement row and multiple (depending on number of sent logs) logMeasurement rows 

## To do (many things but here are some of them)

- Rebuild database in more sensible way – too many repeating values in separate tables
- Use redux to store state - too many useState() calls (the code becomes messy in early stage)
- Coordinates uploaded automatically by device location
- Other measurement method – stack
- Add woodpile list
- Add truck/delivery list
- Field with different wood types
- Google maps with pins that show where wood is stored
- Measurements to excel or pdf file
- Report page with different kinds of reports