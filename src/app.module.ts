import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity'; 
import { BookingModule } from './booking/booking.module';
import { Booking } from './booking/booking.entity'; 
import { LocationModule } from './location/location.module';
import { InsuranceModule } from './insurance/insurance.module';
import { Location } from './location/location.entity';
import { Insurance } from './insurance/insurance.entity'; 
import { FuelModule } from './fuel/fuel.module';
import { Fuel } from './fuel/fuel.entity';
import { RentalSummaryModule } from './rental-summary/rental-summary.module';
import { RentalSummary } from './rental-summary/rental-summary.entity'; 
import { PaymentModule } from './payment/payment.module';
import { Payment } from './payment/payment.entity'; 
import { SavedVehicleModule } from './saved-vehicles/saved-vehicles.module';
import { SavedVehicle } from './saved-vehicles/saved-vehicle.entity'; 
import { NotificationModule } from './notifications/notifications.module';
import { CarModule } from './car/car.module';
import { Car } from './car/car.entity';
import { MailModule } from './mail/mail.module';
@Module({
  imports: [
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'car_rent',
      entities: [User, Booking, Location, Insurance, Fuel, RentalSummary, Payment, SavedVehicle, Car], 
      synchronize: true,
      autoLoadEntities: true, 
    }),
    BookingModule,
    LocationModule,
    InsuranceModule,
    FuelModule,
    RentalSummaryModule,
    PaymentModule,
    SavedVehicleModule,
    NotificationModule,
    CarModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
