# govtech-ptp
A simple web application which implements a health declaration form and displays Responses data
## Form
![image](https://github.com/0nyxxxx/govtech-ptp/assets/146475981/b039b07a-82af-4f38-b2ac-8b2c6c224cf2)
## Responses
![image](https://github.com/0nyxxxx/govtech-ptp/assets/146475981/fc736f30-8e83-407a-bd1e-5c01be20ed20)


## MySQL
- SQL Script - `ptp-schema.sql`
- In MySQL Workbench click on File and Open SQL Script and open `ptp-schema.sql` then click on the lightning symbol

![image](https://github.com/0nyxxxx/govtech-ptp/assets/146475981/87d8a78b-a437-4ecc-872b-dd4934f9637e)

### Connection settings

- Modify `db-connection.js` password to `YOUR LOCAL MYSQL PASSWORD`

  
### ER Diagram

![image](https://github.com/0nyxxxx/govtech-ptp/assets/146475981/a40909be-3962-48bb-9bc1-03d884d55dfd)

## Commands
- Install Dependencies - `npm install`
- Run Web Server -  `npm start`
- Run Application - `npm run dev`

## Features
- Search Responses by name
- Export Responses to Excel (xlsx)
- Pagination
- Form validation
### Filter
- Symptoms
- Close Contact
- Temperature range







