import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importações do SDK do Firebase
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';   // opcional, se você usar Firestore depois

import { environment } from '../environments/environment';   // Suas configurações do Firebase
import { getFirestore } from 'firebase/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Configuração do Firebase
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
provideFirestore(()=> getFirestore()),
    provideAuth(() => getAuth()),           // ← Importante para autenticação

    // Se você for usar Firestore no futuro, descomente esta linha:
    // provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
