import React from "react";
import { Card, CardBody,CardText,CardImg,CardTitle } from 'reactstrap';

const CardSection = ({result})=>{
    return (   
        <a key={result.id} href={result.thumbnail} className="result-item">
            <Card className="card-des" >
                    <CardImg top width="200px" height="200px" src={result.thumbnail} alt={result.name} />
                    <CardBody className="text-style">
                        <CardTitle>{result.name}</CardTitle>
                        <CardText>Price: {result.display_price}</CardText>
                        <CardText>Min Quantity: {result.minimum_quantity}</CardText>
                        <CardText>Product Type: {result.product_type}</CardText>
                        {result.out_of_stock ? <CardText>Out of Stock</CardText>:<CardText>in Stock</CardText>}
                    </CardBody>
            </Card>
        </a>
    );
}

export default CardSection;
