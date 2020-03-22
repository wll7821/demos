const fs = require('fs')
const parseString = require('xml2js').parseString;
const xml = fs.readFileSync('./nodetree_zt.xml').toString()
parseString(xml,function(err,result){
    const map ={}
    const result2 = []
    result.nodes.node.forEach(node => {
        const { nodeID, parentID, articleNum } = node.$
        const [ nodeName ] = node.nodeName
        const [ url ] = node.nodeUrl

        map[nodeID] = { name: nodeName,target:'nodeframe',url }

        if( map[parentID] ){
            if( !map[parentID].children ){
                map[parentID].children = []
            }
            map[parentID].children.push(map[nodeID])
        }else{
            result2.push(map[nodeID])
        }
    });
    fs.writeFileSync('./nodetree_zt.json',JSON.stringify(result2,null,2));
})