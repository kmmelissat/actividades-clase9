import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Documentación de la API')
    .setDescription('Documentación de la API organizada por ejercicios')
    .setVersion('1.0')
    .addTag(
      'Ejercicio 1 - Configuración',
      'Endpoint protegido de configuración con JWT',
    )
    .addTag('Ejercicio 2 - Tareas', 'Controlador protegido de tareas con JWT')
    .addTag(
      'Ejercicio 3 - Usuarios',
      'Gestión de usuarios con protección de auto-eliminación',
    )
    .addTag(
      'Ejercicio 4 - Autenticación',
      'Autenticación con base de datos y JWT',
    )
    .addTag('Ejercicio 5 - Productos', 'Rutas públicas y privadas de productos')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
