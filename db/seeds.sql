-- DEPARTMENT SEEDS -----
INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

-- ROLE SEEDS -------
-- sales roles
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Head Salesman", 80000, 1);
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Lead Finder", 80000, 1);

-- engineers
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Software Engineer", 150000, 2);
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Mechanical Engineer", 120000, 2);


-- finance roles
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Financial Assistant", 250000, 3);
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Accountant", 125000, 3);


-- legal roles
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO role (jobTitle, salary, department_id)
VALUE ("Receptionist", 190000, 4);
