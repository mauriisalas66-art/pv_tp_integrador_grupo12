// src/views/ListaClientes.jsx
import { useState } from 'react';
import { Container, Table, Button, Card } from 'react-bootstrap';

const ListaClientes = () => {
    // Datos cableados provisorios 
    const [clientes] = useState([
        { id: 1, name: { firstname: "John", lastname: "Doe" }, email: "john@mail.com", phone: "123456789", address: { city: "Sanjuan" } }
    ]);       

    return (
        <Container className="mt-3">
            <h2 className="fw-bold text-dark mb-4">Base General de Clientes</h2>
            
            <Card className="shadow-sm border-0 bg-white">
                <Table responsive hover className="align-middle mb-0">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Ciudad</th>
                            <th className="text-center">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id}>
                                <td className="fw-bold text-primary">#{cliente.id}</td>
                                <td className="text-capitalize">{cliente.name.firstname} {cliente.name.lastname}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.phone}</td>
                                <td className="text-capitalize">{cliente.address.city}</td>
                                <td className="text-center">
                                    <Button variant="outline-primary" size="sm" className="fw-bold">
                                        Ver Ficha Completa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
        </Container>
    );
};

export default ListaClientes;