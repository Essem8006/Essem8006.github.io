class Ball {

    constructor(world, RAPIER, x, y , r, control=null) {
        this.colour = 'rgb('+Math.random()*255+','+Math.random()*255+','+Math.random()*255+')';
        this.rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(x,y);
        this.rigidBody = world.createRigidBody(this.rigidBodyDesc);
        this.colliderDesc = RAPIER.ColliderDesc.ball(r).setRestitution(0.8).setFriction(0.3);
        this.collider = world.createCollider(this.colliderDesc, this.rigidBody);
        if(control == 'KEYS'){
            this.controls=new Controls("KEYS");
        }else{
            this.controls=null;
        }
    }

    update(RAPIER) {
        this.rigidBody.resetForces(true);
        if(this.controls != null){
            if(this.controls.up){
                this.rigidBody.applyImpulse(new RAPIER.Vector2(0, -500000), true);
            }
            if(this.controls.left){
                this.rigidBody.applyImpulse(new RAPIER.Vector2(-100000, 0), true);
            }
            if(this.controls.right){
                this.rigidBody.applyImpulse(new RAPIER.Vector2(100000, 0), true);
            }

        }
    }

    draw(ctx) {
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.rigidBody.translation().x, this.rigidBody.translation().y, this.collider._shape.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}
