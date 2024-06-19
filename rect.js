class Rectangle {

    constructor(world, RAPIER, x, y , w, h) {
        this.colour = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
        this.rigidBodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(x,y);
        this.rigidBody = world.createRigidBody(this.rigidBodyDesc);
        this.rigidBodyHandle = this.rigidBody.handle;
        this.colliderDesc = RAPIER.ColliderDesc.cuboid(w,h);
        this.collider = world.createCollider(this.colliderDesc, this.rigidBody);
    }

    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.rect(this.rigidBody.translation().x-this.colliderDesc.shape.halfExtents.x, this.rigidBody.translation().y-this.colliderDesc.shape.halfExtents.y, this.colliderDesc.shape.halfExtents.x*2, this.colliderDesc.shape.halfExtents.y*2);
        ctx.fill();
    }
}