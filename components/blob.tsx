import React, { useEffect, useState } from 'react';
import Matter from 'matter-js';

const Blob = () => {
    const [gravityDirection, setGravityDirection] = useState({ x: 0, y: 1 });

    useEffect(() => {
        // Create an engine
        var engine = Matter.Engine.create();
        var world = engine.world;

        // Define the canvas dimensions
        const width = 500;
        const height = 500;

        // Create a renderer
        var render = Matter.Render.create({
            element: document.body,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false
            }
        });

        // Create a blob
        var blob = Matter.Bodies.circle(250, 250, 40, {
            restitution: 0.9, // Optional: add some bounce
            render: {
                fillStyle: '#3498db'
            }
        });

        // Add walls
        const wallOptions = { isStatic: true, render: { visible: false } };
        var ground = Matter.Bodies.rectangle(width / 2, height, width, 20, wallOptions);
        var leftWall = Matter.Bodies.rectangle(0, height / 2, 20, height, wallOptions);
        var rightWall = Matter.Bodies.rectangle(width, height / 2, 20, height, wallOptions);
        var topWall = Matter.Bodies.rectangle(width / 2, 0, width, 20, wallOptions);

        // Add the blob and walls to the world
        Matter.World.add(world, [blob, ground, leftWall, rightWall, topWall]);

        // Add mouse control
        var mouse = Matter.Mouse.create(render.canvas),
            mouseConstraint = Matter.MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    render: { visible: false }
                }
            });

        Matter.World.add(world, mouseConstraint);

        // Run the engine
        Matter.Engine.run(engine);

        // Run the renderer
        Matter.Render.run(render);

        // Function to change gravity
        const changeGravity = () => {
            const newX = 0; // Random gravity between -1 and 1
            const newY = 0; // Random gravity in the y-axis
            engine.world.gravity.x = newX;
            engine.world.gravity.y = newY;
            setGravityDirection({ x: newX, y: newY });
        };

        // Change gravity every 2 seconds
        const gravityInterval = setInterval(changeGravity, 2000);

        // Cleanup on component unmount
        return () => {
            clearInterval(gravityInterval);
            Matter.Render.stop(render);
            Matter.World.clear(world);
            Matter.Engine.clear(engine);
            render.canvas.remove();
        };
    }, []);

    return (
        <div>
            <div id="arrow" style={{
                transform: `rotate(${Math.atan2(gravityDirection.y, gravityDirection.x)}rad)`,
                position: 'absolute',
                top: '10px',
                left: '50%',
                width: '20px',
                height: '50px',
                backgroundColor: 'red',
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                transformOrigin: '50% 50%',
            }} />
        </div>
    );
};

export default Blob;
