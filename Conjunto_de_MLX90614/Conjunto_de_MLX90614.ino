#include <i2cmaster.h>
//primer aleta
int device1Address = 0x1A<<1;

int device2Address = 0x2A<<1;

int device3Address = 0x3A<<1;

int device4Address = 0x4A<<1;

int device5Address = 0x5A<<1;

//segunda aleta

int device6Address = 0x01<<1;

int device7Address = 0x02<<1;

int device8Address = 0x03<<1;

int device9Address = 0x04<<1;

int device10Address = 0x05<<1; 

int seleccion = 0;

//variables
float celcius1 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit1 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.
float celcius2 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 2.
float fahrenheit2 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 2.
float celcius3 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit3 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.
float celcius4 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit4 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.     
float celcius5 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit5 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.    
float celcius6 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit6 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.     
float celcius7 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit7 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.
float celcius8 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit8 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.                                                                                            
float celcius9 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit9 = 0;          // Variable que contiene la temperatura en Fahrenheit
                                // para el sensor 1.
float celcius10 = 0;             // Variable que contiene la temperatura en Celcius
                                // para el sensor 1.
float fahrenheit10 = 0; 

void setup()
{
  Serial.begin(115200);           // Inicia la comunicación serial a 9600bps.
  Serial.println("Ready");   
  i2c_init();                               // Inicia el bus i2c.
  PORTC = (1 << PORTC4) | (1 << PORTC5);    // Habilita ‘pullups’.
}

void loop()
{
  if(Serial.available()){
    //primeros
    if(seleccion ==1){
      celcius1 = temperatureCelcius(device1Address);// Lee los datos del MLX90614
      celcius2 = temperatureCelcius(device2Address);// con la dirección dada,
      celcius3 = temperatureCelcius(device3Address);// los transforma en
      celcius4 = temperatureCelcius(device4Address);// temperatura en Celcius y
      celcius5 = temperatureCelcius(device5Address);// la guarda en las variables
    
    }else{
      if(seleccion == 2){
        celcius1 = temperatureCelcius(device6Address);// Lee los datos del MLX90614
        celcius2 = temperatureCelcius(device7Address);// con la dirección dada,
        celcius3 = temperatureCelcius(device8Address);// los transforma en
        celcius4 = temperatureCelcius(device9Address);// temperatura en Celcius y
        celcius5 = temperatureCelcius(device10Address);// la guarda en las variables
      }else{
        if(seleccion == 3){
          celcius1 = temperatureCelcius(device1Address);// Lee los datos del MLX90614
          celcius2 = temperatureCelcius(device2Address);// con la dirección dada,
          celcius3 = temperatureCelcius(device3Address);// los transforma en
          celcius4 = temperatureCelcius(device4Address);// temperatura en Celcius y
          celcius5 = temperatureCelcius(device5Address);// la guarda en las variables
          celcius6 = temperatureCelcius(device6Address);// Lee los datos del MLX90614
          celcius7 = temperatureCelcius(device7Address);// con la dirección dada,
          celcius8 = temperatureCelcius(device8Address);// los transforma en
          celcius9 = temperatureCelcius(device9Address);// temperatura en Celcius y
          celcius10 = temperatureCelcius(device10Address);// la guarda en las variables
        }else{
        }
      }
    }
    //segundos
    /*
    celcius6 = temperatureCelcius(device6Address);// celcius1,celcius2,celcius3, celcius4 o celcius5.
    celcius7 = temperatureCelcius(device7Address);
    celcius8 = temperatureCelcius(device8Address);
    celcius9 = temperatureCelcius(device9Address);
    celcius10 = temperatureCelcius(device10Address);
    */
    String message = "{ \"s1\":";
    //char valor[6]; 
    
    String valor = "";
    //dtostrf(celcius1, 6, 2, valor);
    valor = "10.00";
    message += valor;
    
    message += ", \"s2\":";
    //dtostrf(celcius2, 6, 2, valor);
    valor = "15.00";
    message += valor;
    
    message += ", \"s3\":";
    //dtostrf(celcius3, 6, 2, valor);
    valor = "20.00";
    message += valor;
    
    message += ", \"s4\":";
    //dtostrf(celcius4, 6, 2, valor);
    valor = "25.00";
    message += valor;
    
    message += ", \"s5\":";
    //dtostrf(celcius5, 6, 2, valor);
    valor = "30.00";
    message += valor;

    message += ", \"s6\":";
    //dtostrf(celcius6, 6, 2, valor);
    valor = "1.00";
    message += valor;
    
    message += ", \"s7\":";
    //dtostrf(celcius7, 6, 2, valor);
    valor = "2.00";
    message += valor;
    
    message += ", \"s8\":";
    //dtostrf(celcius8, 6, 2, valor);
    valor = "3.00";
    message += valor;
    
    message += ", \"s9\":";
    //dtostrf(celcius9, 6, 2, valor);
    valor = "4.00";
    message += valor;

    message += ", \"s10\":";
    //dtostrf(celcius10, 6, 2, valor);
    valor = "5.00";
    message += valor;
    
    message += "}";
    Serial.println(message);
  }
  delay(1000);                         // Espera un segundo para imprimir de nuevo.
}

float temperatureCelcius(int address) {
  int dev = address;
  int data_low = 0;
  int data_high = 0;
  int pec = 0;

  // Escribe
  i2c_start_wait(dev+I2C_WRITE);
  i2c_write(0x07);

  // Lee
  i2c_rep_start(dev+I2C_READ);
  data_low = i2c_readAck();       // Lee 1 byte y envía ack.
  data_high = i2c_readAck();      // Lee 1 byte y envía ack
  pec = i2c_readNak();
  i2c_stop();

  // Esto convierte los bytes altos y bajos juntos y procesa la temperatura.
  double tempFactor = 0.02;       // 0.02 grados por LSB (medida de
                                  // resolución del MLX90614).
  double tempData = 0x0000;       
  int frac;                       // Datos después del punto decimal.

  // Esto oculta el error del byte alto y lo mueve a la izquierda
  // 8 bits y agrega el byte bajo.
  tempData = (double)(((data_high & 0x007F) << 8) + data_low);
  tempData = (tempData * tempFactor)-0.01;
  float celcius = tempData - 273.15;
  
  // Retorna la temperatura en Celcius.
  return celcius;
}
