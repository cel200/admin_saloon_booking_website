
import React from 'react';
import ServiceHeader from '@/components/Services/ServiceHeader';
import ServiceList from '@/components/Services/ServiceList';

export default function ServicesPage() {
    const services = [
        { id: 1, name: 'Premium Haircut', duration: '45 min', price: '$45.00', category: 'Hair' },
        { id: 2, name: 'Beard Trim', duration: '20 min', price: '$25.00', category: 'Beard' },
        { id: 3, name: 'Hair Coloring', duration: '120 min', price: '$120.00', category: 'Hair' },
        { id: 4, name: 'Manicure', duration: '30 min', price: '$35.00', category: 'Nails' },
        { id: 5, name: 'Full Facial', duration: '60 min', price: '$80.00', category: 'Face' },
    ];

    return (
        <div className="page-container animate-fade-in">
            <ServiceHeader />
            <ServiceList services={services} />
        </div>
    );
}
