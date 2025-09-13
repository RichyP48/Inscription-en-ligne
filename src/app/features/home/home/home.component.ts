import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any[] {
    if (!items || !searchTerm) {
      return items;
    }
    return items.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [CommonModule, RouterLink, FormsModule
    
],
  standalone: true
})
export class HomeComponent {
  features = [
    {
      title: 'Smart Form',
      description: 'Intuitive 5-step registration process with auto-save functionality',
      icon: 'document-text'
    },
    {
      title: 'Document Upload',
      description: 'Secure PDF/IMG uploads with preview and validation',
      icon: 'cloud-upload'
    },
    {
      title: 'Notifications',
      description: 'Stay updated with progress alerts and reminders',
      icon: 'bell'
    },
    {
      title: 'Secure Authentication',
      description: 'Multi-auth options with email, Google, and Microsoft',
      icon: 'shield-check'
    }
  ];
    searchTerm: string = '';
  offers: any[] = []; 


  internshipOffers = [
    {
      id: 1,
      category: 'Développement Web',
      title: 'Stagiaire Développeur Front-End',
      company: 'Tech Solutions Inc.',
      location: 'Paris, France',
      duration: '6 mois'
    },
    {
      id: 2,
      category: 'Design UX/UI',
      title: 'Stagiaire Designer UX/UI',
      company: 'Creative Minds Studio',
      location: 'Lyon, France',
      duration: '4 mois'
    },
    {
      id: 3,
      category: 'Marketing Digital',
      title: 'Stagiaire en Marketing Digital',
      company: 'Growth Hackers Agency',
      location: 'Bordeaux, France',
      duration: '6 mois'
    },
    {
      id: 4,
      category: 'Science des Données',
      title: 'Stagiaire Data Scientist',
      company: 'Data Insights',
      location: 'Nantes, France',
      duration: '6 mois'
    },
    {
      id: 5,
      category: 'Gestion de Projet',
      title: 'Stagiaire Chef de Projet Junior',
      company: 'Project Pro',
      location: 'Marseille, France',
      duration: '6 mois'
    },
    {
      id: 6,
      category: 'Cybersécurité',
      title: 'Stagiaire Analyste en Cybersécurité',
      company: 'SecureNet',
      location: 'Toulouse, France',
      duration: '5 mois'
    },
  ];

 

  ngOnInit(): void {
  }
  constructor() {
    
    this.offers = [
      { id: 1, title: 'Stage 1', company: 'Entreprise A', location: 'Lieu A', duration: '3 mois', category: 'Développement' },
      { id: 2, title: 'Stage 2', company: 'Entreprise B', location: 'Lieu B', duration: '6 mois', category: 'Marketing' },
    ];
  }
}
