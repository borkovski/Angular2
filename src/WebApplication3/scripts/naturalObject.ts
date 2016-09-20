import {ICoordinates, Vector2d} from './position';

export interface INaturalObject {
    position: ICoordinates;
    velocity: ICoordinates;
    acceleration: ICoordinates;
    boundaries: ICoordinates;
    mass: number;
    restitution: number;
    radius: number;

    setForces(forces: ICoordinates[]);
    applyForce(force: ICoordinates);
    update();
    draw(context: CanvasRenderingContext2D);
}

export class NaturalObject implements INaturalObject {
    position: ICoordinates;
    velocity: ICoordinates;
    acceleration: ICoordinates;
    mass: number;
    restitution: number;
    boundaries: ICoordinates;
    forces: ICoordinates[];
    color: string;
    radius: number;

    constructor(
        initialPosition: ICoordinates,
        initialMass: number,
        restitution: number,
        boundaries: ICoordinates,
        initialVelocity: ICoordinates = new Vector2d(0, 0),
        initialAcceleration: ICoordinates = new Vector2d(0, 0)) {

        this.position = new Vector2d(initialPosition.x, initialPosition.y);
        this.velocity = new Vector2d(initialVelocity.x, initialVelocity.y);
        this.acceleration = new Vector2d(initialAcceleration.x, initialAcceleration.y);
        this.mass = initialMass;
        this.restitution = restitution;
        this.boundaries = boundaries;
        if (this.mass <= 1) {
            this.color = "blue";
        }
        else if (this.mass <= 1.5) {
            this.color = "green";
        }
        else if (this.mass <= 2) {
            this.color = "ÿellow";
        }
        else if (this.mass <= 2.5) {
            this.color = "orange";
        }
        else {
            this.color = "red";
        }
        this.radius = this.mass * 10;
    }

    setForces(forces: ICoordinates[]) {
        this.forces = forces;
    }

    applyForce(force: ICoordinates) {
        var normForce = force.clone();
        this.acceleration.add(normForce.div(this.mass));
    }

    update() {
        for (var i in this.forces) {
            this.applyForce(this.forces[i]);
        }
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
        this.checkBoundaries();
    }

    checkBoundaries() {
        if (this.position.x - this.radius < 0 || this.position.x + this.radius > this.boundaries.x) {
            this.velocity = new Vector2d(this.velocity.x * -1 * this.restitution, this.velocity.y);
            this.position.x = this.position.x - this.radius < 0 ? 0 + this.radius : this.boundaries.x - this.radius;
        }
        if (this.position.y + this.radius > this.boundaries.y) {
            this.velocity = new Vector2d(this.velocity.x, this.velocity.y * -1 * this.restitution);
            this.position.y = this.boundaries.y - this.radius;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
    }
}