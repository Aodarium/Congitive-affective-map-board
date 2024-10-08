const data: any = {
    edges: [
        { id: 1, source: 0, target: 1, selected: false },
        { id: 2, source: 1, target: 2, selected: false },
        { id: 3, source: 2, target: 3, selected: false },
    ],
    nodes: [
        { id: 0, label: 'Node 1', position: {x:10, y:10}, selected: false },
        { id: 1, label: 'Node 2', position: {x:600, y:200}, selected: false },
        { id: 2, label: 'Node 3', position: {x:300, y:200, selected: false}},
        { id: 3, label: 'Node 4', position: {x:800, y:800}, selected: false },
    ],
    options: {
        layout: {
            randomSeed: 1,
        },
        edges: {
            width: 2,
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5,
                    type: 'arrow',
                },
            },
        },
    },
    zoom: 1,
};

export {data};