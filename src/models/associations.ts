import { Scheduling } from './Scheduling';
import { Client } from './Client';
import { Service } from './Service';
import { Employees } from './Employees';
import { SchedulingCancel } from './SchedulingCancel';
import { Business } from './Business';

Scheduling.belongsTo(Client, { foreignKey: 'clientId' });
Scheduling.belongsTo(Service, { foreignKey: 'serviceId' });

Client.hasMany(Scheduling, { foreignKey: 'clientId' });
Service.hasMany(Scheduling, { foreignKey: 'serviceId' });

SchedulingCancel.belongsTo(Scheduling, { foreignKey: "schedulingId" });
Scheduling.hasMany(SchedulingCancel, { foreignKey: "schedulingId" });

Service.belongsTo(Business, { foreignKey: "id_business" });
Business.hasMany(Service, { foreignKey: "id_business" });

Employees.belongsTo(Business, { foreignKey: "id_business" });
Business.hasMany(Employees, { foreignKey: "id_business" });
