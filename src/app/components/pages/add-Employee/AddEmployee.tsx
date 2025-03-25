import { useEffect, useState } from 'react';
import './addEmployee.css';
import { Link, useParams } from 'react-router-dom';
import { DataTable, DataTableFilterMeta } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { FilterMatchMode } from 'primereact/api';
import ExpandableText from '../Exapnd/ExpandableText';
import AddEditProject from '../../popup/AddEditProject';
import { useDispatch, useSelector } from 'react-redux';
import { employeeDataById } from '../../../Reducers/getDataListSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { Loader } from '../../constants/loader/Loader';
import { Document, Packer, Paragraph, Table, TableCell, TableRow, WidthType, Header, Footer, TextRun, AlignmentType, BorderStyle, ShadingType } from "docx";
import { saveAs } from "file-saver";


const AddEmployee = () => {
  const employeeData = useSelector((State: any) => State.employeeList.employeeData);
  const employeeArray = Array.isArray(employeeData) ? employeeData : [employeeData];
  const [value, setValue] = useState({
    Name: '',
    TitleRole: '',
    CompanyLocation: '',
    Education: '',
    CertificatesLicenses: '',
    OtherQualification: '',
    WorkStartYear: '',
    WorkEndYear: '',
    WorkEndPresent: false,
    ATIStartYear: '',
    ATIEndYear: '',
    ATiEndPresent: false,

  });
  console.log(employeeArray, "employee data");
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [loading, setLoading] = useState(true);
  const [projectList, setProjectList] = useState<any[]>([]);
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const [projectId, setProjectId] = useState<number | null>(null);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>('');
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    TitleandLocation: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    ProfessionalService: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    AgePS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    OngoingCheckedPS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    NACheckedPS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Construction: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    AgeCS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    OngoingCheckedCS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    NACheckedCS: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Role: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Description: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    ProjectValue: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Checked: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword1: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword2: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword3: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword4: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword5: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword6: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword7: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword8: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword9: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
    Keyword10: { operator: 'and', constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
  });


  useEffect(() => {
    const fetchData = async () => {
      if (employeeId) {
        try {
          setLoading(true);
          const response = await dispatch(employeeDataById(employeeId));
          if (response?.payload) {
            const formattedWorkStartYear = response.payload.WorkStartYear ? response.payload.WorkStartYear.split('T')[0] : ''
            const formattedWorkEndYear = response.payload.WorkEndYear ? response.payload.WorkEndYear.split('T')[0] : ''
            const formattedATIStartYear = response.payload.ATIStartYear ? response.payload.ATIStartYear.split('T')[0] : ''
            const formattedATIEndYear = response.payload.ATIEndYear ? response.payload.ATIEndYear.split('T')[0] : ''
            setValue((prev) => ({
              ...prev,
              ...response.payload,

              WorkStartYear: formattedWorkStartYear,
              WorkEndYear: formattedWorkEndYear,
              WorkEndPresent: response.payload.WorkEndPresent || false,
              ATIStartYear: formattedATIStartYear,
              ATIEndYear: formattedATIEndYear,
              ATiEndPresent: response.payload.ATiEndPresent || false,

            }));

            setProjectList(response.payload.proejctList);
          }
          setLoading(false);
        }
        catch (error) {
          console.log(error, "error");
          setLoading(false);
        }
      }
    }
    fetchData();
  }, []);


  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,


    }));
  };
  const onGlobalFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    let _filters = { ...filters };

    // @ts-ignore
    _filters['global'].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-content-between">
        <IconField iconPosition="left">
          <InputIcon className="pi pi-search" />
          <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Search" />
        </IconField>
      </div>
    );
  };
  const handleEdit = async (projectId: number) => {
    setProjectId(projectId);
  };

  const header = renderHeader();

  const exportWord = () => {
    const header = new Header({
      children: [
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                // Left cell with placeholder image and border
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                    right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
                  },
                  width: {
                    size: 18,
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({
                          text: "Placeholder Image",
                          font: "Arial Narrow",
                          size: 24,
                          color: "000000",
                        }),
                      ],
                    }),
                  ],
                }),

                // Right-aligned text with no border
                new TableCell({
                  borders: {
                    top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                    right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                  },
                  width: {
                    size: 82, // Remaining percentage
                    type: WidthType.PERCENTAGE,
                  },
                  children: [
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [
                        new TextRun({
                          text: "[PLACEHOLDER] Client Name",
                          font: "Arial Narrow",
                          size: 18,
                          bold: true,
                        }),
                      ],
                    }),
                    new Paragraph({
                      alignment: AlignmentType.RIGHT,
                      children: [
                        new TextRun({
                          text: "[PLACEHOLDER] RFP Name - [PLACEHOLDER] RFP Number",
                          font: "Arial Narrow",
                          size: 18,
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    const table = new Table({
      columnWidths: [100, 100,100],
      rows: employeeArray.flatMap((item: any) => [
        new TableRow({
          children: [
            new TableCell({
              borders: {
                top: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
              },
              width: { size: 3505, type: WidthType.DXA },
              shading: { fill: "CCFFCC" }, // Light Green Background
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text : "12. NAME",
                      size: 13,
                      font:"Arial",
                      
                    }),
                  ],
                }),
              ],
            }),
            new TableCell({
              borders: {
                top: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                left: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
              },
              width: { size: 5505, type: WidthType.DXA },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text:  "13. ROLE IN THIS CONTRACT",
                      size: 13,
                      font:"Arial"
                    })                 
                  ]
                })
              ],
            }),
          ],
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                left: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
              },
              width: { size: 3505, type: WidthType.DXA },
              shading: { fill: "CCFFCC" },
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: item.Name || "",
                      bold: true,
                      font: "calibri",
                      size: 22
                    }),
                  ]
                })
              ],
            }),
            new TableCell({
              borders: {
                top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
                bottom: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                left: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
                right: { style: BorderStyle.SINGLE, size: 3, color: "000000" },
              },
              width: { size: 5505, type: WidthType.DXA },
              children: [
                new Paragraph({
                  children: [
                    new TextRun ({
                      text: item.TitleRole || "",
                      bold: true,
                      font: "calibri",
                      size: 22
                    })
                  ]
                })
              ]
            }),
          ],
        }),
      ]),
    });

    const footer = new Footer({
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: "Page ",
              bold: true,
            }),
            new TextRun({
              children: ["PAGE_NUMBER"],
            }),
            new TextRun({
              text: " of ",
              bold: true,
            }),
            new TextRun({
              children: ["NUM_PAGES"],
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    });
    const doc = new Document({
      sections: [
        {
          headers: { default: header },
          footers: { default: footer },
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: {
                top: { size: 3, color: "000000", style: BorderStyle.SINGLE },
                bottom: { size: 3, color: "000000", style: BorderStyle.SINGLE },
                left: { size: 3, color: "000000", style: BorderStyle.SINGLE },
                right: { size: 3, color: "000000", style: BorderStyle.SINGLE },
              },
              shading: { fill: "D0E9F7" },
              spacing:{
                after:50
              },
              children: [
                new TextRun({
                  text: "E. RESUMES OF KEY PERSONNEL PROPOSED FOR THIS CONTRACT",
                  color: "000000",
                  bold: true,
                  size: 16,
                  font: "Arial Narrow",
                }),
              ],
            }),
            table
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "EmployeeDocument.docx");
    });
  }

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className='content-wrapper'>
        <div className='heading'>
          <h3>Add Employee</h3>
        </div>
        <button onClick={exportWord}>Export to Word</button>
        <form className='row'>
          <div className='col-md-12'>
            <div className='panel panel-default'>
              <div className='panel-body'>
                <div className='row'>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Name <span className='text-danger'>*</span></label>
                      <input
                        type='text'
                        className='form-control'
                        id='userName'
                        name='userName'
                        required
                        aria-label='Employee Name'
                        value={value.Name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Title/Role <span className='text-danger'>*</span></label>
                      <input
                        type='text'
                        className='form-control'
                        id='titleRole'
                        name='titleRole'
                        required
                        aria-label='Employee Title or Role'
                        value={value.TitleRole}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Company & Location <span className='text-danger'>*</span></label>
                      <input
                        type='text'
                        className='form-control'
                        id='companyLocation'
                        name='companyLocation'
                        required
                        aria-label='Company and Location'
                        value={value.CompanyLocation}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Education/Degrees <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        id='educationDegree'
                        name='educationDegree'
                        rows={3}
                        style={{ resize: 'none' }}
                        required
                        aria-label='Education or Degree '
                        value={value.Education}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Certifications and Licenses <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        id='certificationLicenses'
                        name='certificationLicenses'
                        rows={3}
                        style={{ resize: 'none' }}
                        required
                        aria-label='Certifications and Licenses'
                        value={value.CertificatesLicenses}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Other Professional Qualifications <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        id='otherProfessional'
                        name='otherProfessional'
                        rows={3}
                        style={{ resize: 'none' }}
                        required
                        aria-label='Other Professional Qualifications'
                        value={value.OtherQualification}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Work Start Year <span className='text-danger'>*</span></label>
                      <input
                        type='date'
                        className='form-control'
                        id='workStartYear'
                        name='workStartYear'
                        required
                        aria-label='work StartYear'
                        value={value.WorkStartYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-3 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Work End Year</label>
                      <input
                        type='date'
                        className='form-control'
                        id='workEndYear'
                        name='workEndYear'
                        aria-label='work endYear'
                        value={value.WorkEndYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-1 px-2'>
                    <div className="mb-3">
                      <label className='form-label'>Is Present</label>
                      <div className="form-check">
                        <input
                          className='form-check-input'
                          width={"10px"}
                          type='checkbox'
                          id='isPresent'
                          aria-label='Is Present'
                          style={{ width: '25px', height: '25px' }}
                          checked={value.WorkEndPresent}
                          onChange={(e) =>
                            setValue((prev) => ({
                              ...prev,
                              WorkEndPresent: e.target.checked,
                            }))
                          }
                        />

                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Years of Experience</label>
                      <input
                        type='text'
                        className='form-control'
                        id='yearExperience'
                        name='yearExperience'
                        required
                        aria-label='Years of Experience'
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>ATI Start Year <span className='text-danger'>*</span></label>
                      <input
                        type='date'
                        className='form-control'
                        id='atiStartYear'
                        name='atiStartYear'
                        required
                        aria-label='ati StartYear'
                        value={value.ATIStartYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-3 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>ATI End Year</label>
                      <input
                        type='date'
                        className='form-control'
                        id='atiEndYear'
                        name='atiEndYear'
                        aria-label='ati endYear  '
                        placeholder=''
                        value={value.ATIEndYear}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className='col-md-1 px-2'>
                    <div className="mb-3">
                      <label className='form-label'>Is Present</label>
                      <div className="form-check">
                        <input
                          className='form-check-input'
                          width={"10px"}
                          type='checkbox'
                          id='atiIsPresent'
                          aria-label='Is Present'
                          style={{ width: '25px', height: '25px' }}
                          checked={value.ATiEndPresent}
                          onChange={(e) =>
                            setValue((prev) => ({
                              ...prev,
                              ATiEndPresent: e.target.checked,
                            }))
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Years with Employer</label>
                      <input
                        type='text'
                        className='form-control'
                        id='yearEmployer'
                        name='yearEmployer'
                        required
                        aria-label='Years with Employer'
                        disabled
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>
            <div className='d-flex justify-content-between align-items-center'>
              <h3 className='mt-2 color-grey'>Projects</h3>

              <button type='button'
                className='btn btn-primary btn-user'
                data-bs-toggle="modal"
                data-bs-target="#addProjectModal">
                Add Project
              </button>

            </div>
            <div className='panel panel-default'>
              <DataTable value={projectList}
                showGridlines
                rows={5}
                paginator
                globalFilterFields={[
                  'TitleandLocation',
                  'ProfessionalService',
                  'AgePS',
                  'OngoingCheckedPS',
                  'NACheckedPS',
                  'Construction',
                  'OngoingCheckedCS',
                  'NACheckedCS',
                  'Role',
                  'Description',
                  'ProjectValue',
                  'Checked',
                  'Keyword1',
                  'Keyword2',
                  'Keyword3',
                  'Keyword4',
                  'Keyword5',
                  'Keyword6',
                  'Keyword7',
                  'Keyword8',
                  'Keyword9',
                  'Keyword10'
                ]}

                header={header}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}>
                <Column selectionMode="multiple"
                  headerStyle={{ width: '3em' }}>
                </Column>

                <Column header="Actions"
                  className='width_action'
                  body={(rowData) => <div>
                    <button type='button'
                      className='btn btn-edit-delete bg-purple m-1 '
                      data-bs-toggle="modal"
                      data-bs-target="#addProjectModal"
                      onClick={() => handleEdit(rowData.Id)}
                    >
                      Edit
                    </button>

                    <Link to='' className='btn btn-edit-delete bg-red m-1'>Delete</Link></div>
                  } />

                <Column
                  header="Title and Location (city and state)"
                  field='TitleandLocation'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.TitleandLocation} maxLength={60} />
                  }
                />

                <Column
                  header="Professional Services Year Completed"
                  field='ProfessionalService'
                  sortable />

                <Column
                  header="Age PS"
                  field='AgePS'
                  sortable />

                <Column
                  header="Ongoing (Age PS)"
                  field='OngoingCheckedPS'
                  body={(rowData) => rowData.OngoingCheckedPS ?
                    <span className='color-green'>Y</span> : <span className='color-red'>N</span>
                  }
                  sortable />

                <Column
                  header="N/A (Age PS)"
                  field='NACheckedPS'
                  body={(rowData) => rowData.NACheckedPS ?
                    <span className='color-green'>Y</span> : <span className='color-red'>N</span>}
                  sortable />

                <Column
                  header="Construction Year Completed"
                  field='Construction'
                  sortable />

                <Column
                  header="Age CS"
                  field='AgeCS'
                  sortable />

                <Column
                  header="Ongoing (Age CS)"
                  field='OngoingCheckedCS'
                  sortable
                  body={(rowData) => rowData.OngoingCheckedCS ?
                    <span className='color-green'>Y</span> : <span className='color-red'>N</span>} />

                <Column
                  header="N/A (Age CS)"
                  field='NACheckedCS'
                  sortable
                  body={(rowData) => rowData.NACheckedCS ?
                    <span className='color-green'>Y</span> : <span className='color-red'>N</span>} />

                <Column
                  header="Role"
                  field='Role'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.role} maxLength={60} ></ExpandableText>} />

                <Column
                  header="Description and Specific Role"
                  field='Description'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Description} maxLength={60}></ExpandableText>} />

                <Column
                  header="Project Value"
                  field='ProjectValue'
                  sortable />

                <Column
                  header="Performed with Current Firm"
                  field='Checked'
                  sortable
                  body={(rowData) => rowData.Checked ?
                    <span className='color-green'>Y</span> : <span className='color-red'>N</span>} />

                <Column
                  header="Keyword 1"
                  field='Keyword1'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword1} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 2"
                  field='Keyword2'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword2} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 3"
                  field='Keyword3'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword3} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 4"
                  field='Keyword4'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword4} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 5"
                  field='Keyword5'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword5} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 6"
                  field='Keyword6'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword6} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 7"
                  field='Keyword7'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword7} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 8"
                  field='Keyword8'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword8} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 9"
                  field='Keyword9'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword9} maxLength={20}></ExpandableText>} />

                <Column
                  header="Keyword 10"
                  field='Keyword10'
                  sortable
                  body={(rowData) =>
                    <ExpandableText content={rowData.Keyword10} maxLength={20}></ExpandableText>} />
              </DataTable>
            </div>

          </div>
        </form>
        <AddEditProject projectId={projectId} />
      </div>
    </>
  )
}

export default AddEmployee

