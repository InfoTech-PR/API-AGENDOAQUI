import { Scheduling } from './Scheduling';
import { Client } from './Client';
import { Service } from './Service';

Scheduling.belongsTo(Client, { foreignKey: 'clientId' });
Scheduling.belongsTo(Service, { foreignKey: 'serviceId' });

Client.hasMany(Scheduling, { foreignKey: 'clientId' });
Service.hasMany(Scheduling, { foreignKey: 'serviceId' });
