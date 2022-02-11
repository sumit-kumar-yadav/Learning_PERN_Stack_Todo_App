const { Parser, Transform } = require('json2csv');

const taskFields = [
  {
    label: 'Task Id',
    value: 'id'
  },
  {
    label: 'Title',
    value: 'title'
  },
  {
    label: 'Description',
    value: 'description'
  },
  {
    label: 'Due Date',
    value: 'due_date'
  },
  {
    label: 'Create at',
    value: 'createdAt'
  },{
    label: 'Updated at',
    value: 'updatedAt'
  },{
    label: 'Category Id',
    value: 'CategoryId'
  },{
      label: 'Category name',
      value: 'Category.type'
  },{
    label: 'Category created at',
    value: 'Category.createdAt'
  },{
    label: 'Category updated at',
    value: 'Category.updatedAt'
  }

];


module.exports.convetToCsv = (tasks: any, res: any) => {
    const json2csvParser = new Parser({ fields: taskFields });
    const csv = json2csvParser.parse(tasks);

    // Set the header
    res.writeHead(200, {  // req.headers['Content-Type']= 'text/csv';
        'Content-Type': 'text/csv'
    });

    res.end(csv);
}
