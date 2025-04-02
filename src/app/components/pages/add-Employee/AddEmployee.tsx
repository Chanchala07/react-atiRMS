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
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Swal from 'sweetalert2';
import { addEmployee } from '../../../Reducers/postDataSlice';

interface FormValues {
  employeeId?: number;
  name: string;
  titleRole?: string;
  companyLocation?: string;
  education?: string;
  certificatesLicenses?: string;
  otherQualification?: string;
  workStartYear?: Date | null;
  workEndYear?: Date | null;
  workEndPresent: boolean;
  aTIStartYear?: Date | null;
  aTIEndYear?: Date | null;
  aTiEndPresent: boolean;
  objAttchLogo: {
    id: number;
    entityType: number;
    entityId: number;
    title?: string | null;
    attachmentUniqueId?: string | null;
    description?: string | null;
    tag?: string | null;
    fileName?: string | null;
    fileExt?: string | null;
    mediaType?: string | null;
    mediaString?: string | null;
    isTempAttachment: boolean;
    absoluteURL: string;
    subCategoryName?: string | null
  };
}


const schema = yup.object({
  employeeId: yup.number().optional(),
  name: yup.string().required("Name is required."),
  titleRole: yup.string().optional(),
  companyLocation: yup.string().optional(),
  education: yup.string().optional(),
  certificatesLicenses: yup.string().optional(),
  otherQualification: yup.string().optional(),
  workStartYear: yup.date().nullable().optional(),
  workEndYear: yup.date().nullable().optional(),
  workEndPresent: yup.boolean().default(false),
  aTIStartYear: yup.date().nullable().optional(),
  aTIEndYear: yup.date().nullable().optional(),
  aTiEndPresent: yup.boolean().default(false),
  objAttchLogo: yup.object({
    id: yup.number().optional().default(0),
    entityType: yup.number().optional().default(0),
    entityId: yup.number().optional().default(0),
    title: yup.string().nullable(),
    attachmentUniqueId: yup.string().nullable(),
    description: yup.string().nullable(),
    tag: yup.string().nullable(),
    fileName: yup.string().nullable(),
    fileExt: yup.string().nullable(),
    mediaType: yup.string().nullable(),
    mediaString: yup.string().nullable(),
    isTempAttachment: yup.boolean().default(false),
    absoluteURL: yup.string().default(" "),
    subCategoryName: yup.string().nullable()
  }),
});


const AddEmployee = () => {
  const employeeData = useSelector((State: any) => State.employeeList.employeeData);
  const employeeArray = Array.isArray(employeeData) ? employeeData : [employeeData];
  const [value, setValueEmployee] = useState({
    name: '',
    TitleRole: '',
    CompanyLocation: '',
    Education: '',
    CertificatesLicenses: '',
    OtherQualification: '',
    workStartYear: '',
    WorkEndYear: '',
    WorkEndPresent: false,
    ATIStartYear: '',
    ATIEndYear: '',
    ATiEndPresent: false,

  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: { name: value?.name }
  });

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
          localStorage.setItem("UserId", response.payload.UserId);

          if (response?.payload) {
            const workStartYearValue = response.payload.WorkStartYear
            ? new Date(response.payload.WorkStartYear)
            : null;

            const workEndYearValue = response.payload.WorkEndYear
              ? new Date(response.payload.WorkStartYear)
              : null;

            const atiStartYearValue = response.payload.ATIStartYear
              ? new Date(response.payload.ATIStartYear)
              : null;

            const atiEndYearValue = response.payload.ATIEndYear
              ? new Date(response.payload.ATIEndYear)
              : null;

            setValue("name", response.payload.Name);
            setValue("titleRole", response.payload.TitleRole || "");
            setValue("companyLocation", response.payload.CompanyLocation || "");
            setValue("education", response.payload.Education || "");
            setValue("certificatesLicenses", response.payload.CertificatesLicenses || "");
            setValue("otherQualification", response.payload.OtherQualification || "");
            setValue("workStartYear", workStartYearValue);
            setValue("workEndYear", workEndYearValue);
            setValue("aTIStartYear", atiStartYearValue);
            setValue("aTIEndYear", atiEndYearValue);
            setValue("objAttchLogo", response.payload.objAttchLogo);
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
    setValueEmployee((prev) => ({
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

    const rows: TableRow[] = [];

    rows.push(
      new TableRow({
        children: [
          new TableCell({
            shading: { fill: "CCFFCC" },
            margins: { left: 100, right: 100, top: 50 },
            width: {
              size: 4000, // 33% of table width
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "12. NAME",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            margins: { left: 100, right: 100, top: 50 },
            width: {
              size: 3500,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "13. ROLE IN THIS CONTRACT",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            width: {
              size: 3500,
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "14. YEARS EXPERIENCE",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          })
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { left: 100, right: 100 },
            shading: { fill: "CCFFCC" },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Anjali",
                    size: 22,
                    font: "Calibri",
                    bold: true
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            margins: { left: 100, right: 100 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Enter all relevant titles and roles you have held. (Ex: Env Scientist and GIS Specialist, Project Manager and Geologist)",
                    size: 22,
                    font: "Calibri",
                    bold: true
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            children: [
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "a. TOTAL:",
                                size: 13,
                                font: "Arial",
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "2",
                                font: "arial narrow",
                                size: 24,
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "b. CURRENT FIRM:",
                                size: 13,
                                font: "Arial",
                              }),
                            ],
                          }),
                          new Paragraph({
                            alignment: AlignmentType.CENTER,
                            children: [
                              new TextRun({
                                text: "15",
                                font: "arial narrow",
                                size: 24,
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
              })
            ],
          })
        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3, //
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "15. FIRM NAME AND LOCATION (City and State)",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            margins: { left: 100, right: 100 },
            columnSpan: 3,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Name, city, and state (two letter identifier) of the ATI/DGI office where you currently work. (Ex: ATI, Inc., Columbia, MD)",
                    size: 22,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 4000, // Same width as "NAME"
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "16. EDUCATION (Degree and Specialization)",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            width: {
              size: 7000,
              type: WidthType.DXA,
            },
            columnSpan: 2,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "17. CURRENT PROFESSIONAL REGISTRATION (State and Discipline)",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),

        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            width: {
              size: 4000, // Same width as "NAME"
              type: WidthType.DXA,
            },
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Provide information on relevant academic degree(s) received on separate lines. Indicate the degree type, university/where the degree is from, graduation date/year, area(s) of specialization, and if it is accredited. (Ex. MSc, Geology, UMD, 2006 or MS. Environmental Eng., Johns Hopkins U., 2015 (ABET))",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
          new TableCell({
            width: {
              size: 7000,
              type: WidthType.DXA,
            },
            columnSpan: 2,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Provide information on current relevant professional registration(s) in a State or possession of the United States including type and state. List each state separately for multiple certifications. (Ex. Professional Geologist, MD or Professional Engineer – MD (#52009, 2019))",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),

        ],
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3, //
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "18. OTHER PROFESSIONAL QUALIFICATIONS (Publications, Organizations, Training, Awards, etc.)",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
        ]
      }),
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3,
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Provide information on any other professional qualifications relating to this contract not previously entered, such as additional education, professional registration, publications, organizational memberships, certifications, training, awards, and foreign language capabilities.",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
        ]
      }),

      new TableRow({
        children: [
          new TableCell({
            columnSpan: 3,
            children: [
              new Paragraph({
                shading: { fill: "337AB7" },
                children: [
                  new TextRun({
                    text: "19. RELEVANT PROJECTS",
                    size: 13,
                    font: "Arial",
                  }),
                ],
              })
            ],
          }),
        ],
      }),
    );
    for (let i = 0; i < 5; i++) {
      // Nested table for each row
      const nestedTable = new Table({
        rows: [
          new TableRow({
            children: [
              new TableCell({
                columnSpan: 3,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: "a",
                        size: 13,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                //columnSpan:3,
                children: [

                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `(1) TITLE AND LOCATION (City and State)`,
                        size: 13,
                      }),
                    ],
                  }),
                ],
              }),
              new TableCell({
                //columnSpan:3,
                children: [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `(2) YEAR COMPLETED`,
                        size: 13,
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        ],
      });
      rows.push(
        new TableRow({
          children: [
            new TableCell({
              width: {
                size: 4000, // Fixed width for the cell containing the nested table, same as the "NAME" column
                type: WidthType.DXA,
              },
              children: [
                nestedTable, // Insert the nested table in this cell
              ],
            }),
          ],
        })
      );
    }
    const mainTable = new Table({
      width: {
        size: 10000,
        type: WidthType.DXA,
      },

      rows: rows,
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
                top: { size: 3, color: "dee2e6", style: BorderStyle.SINGLE },
                bottom: { size: 3, color: "dee2e6", style: BorderStyle.SINGLE },
                left: { size: 3, color: "dee2e6", style: BorderStyle.SINGLE },
                right: { size: 3, color: "dee2e6", style: BorderStyle.SINGLE },
              },
              shading: { fill: "337AB7" },
              indent: { left: 50, right: 50 },
              // margin: {  top: 50 }, 
              children: [
                new TextRun({
                  text: "E. RESUMES OF KEY PERSONNEL PROPOSED FOR THIS CONTRACT",
                  color: "FFFFFF",
                  bold: true,
                  size: 16,
                  font: "Arial Narrow",
                }),
              ],
            }),

            mainTable,
          ],
        },
      ],
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, "EmployeeDocument.docx");
    });
  }

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    console.log("values in form", values);
    const formattedValues = {
      ...values,
      Id: employeeId,
      workStartYear: values.workStartYear ? new Date(values.workStartYear) : null,
      workEndYear: values.workEndYear ? new Date(values.workEndYear) : null,
      aTIStartYear: values.aTIStartYear ? new Date(values.aTIStartYear) : null,
      aTIEndYear: values.aTIEndYear ? new Date(values.aTIEndYear) : null,
      objAttchLogo: values.objAttchLogo

    };
    console.log(formattedValues, "formatted values");
    dispatch(addEmployee(formattedValues))
      .then((res: any) => {
        console.log("res", res);
        Swal.fire({
          icon: "success",
          title: "Employee saved successfully.",
        })
      })
      .catch((error: any) => {
        console.log("Error response", error);
        Swal.fire({
          icon: "error",
          title: "Employee failed.",
          text: "Employee failed"
        })
      })
      .finally(()=>{
        setLoading(false);
      })
  }
  return (
    <>
      {loading ? <Loader /> : ""}
      <div className='content-wrapper'>
        <div className='heading'>
          <h3>Add Employee</h3>
        </div>
        <button onClick={exportWord} className='btn-save'>Export to Word</button>
        <form className='row' onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("name")}
                      />
                      {errors.name && (
                        <p className='error error-text'>
                          {errors.name?.message}
                        </p>
                      )}
                    </div>
                  </div>                

                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Title/Role <span className='text-danger'>*</span></label>
                      <input
                        type='text'
                        className='form-control'
                        {...register("titleRole")}                    
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Company & Location <span className='text-danger'>*</span></label>
                      <input
                        type='text'
                        className='form-control'
                        {...register("companyLocation")}                    
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Education/Degrees <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        rows={3}
                        style={{ resize: 'none' }}
                        {...register("education")}                 
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Certifications and Licenses <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        rows={3}
                        style={{ resize: 'none' }}
                        {...register("certificatesLicenses")}                    
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Other Professional Qualifications <span className='text-danger'>*</span></label>
                      <textarea
                        className='form-control'
                        rows={3}
                        style={{ resize: 'none' }}
                        {...register("otherQualification")}                     
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Work Start Year <span className='text-danger'>*</span></label>
                      <input
                        type='month'
                        className='form-control'                      
                        {...register("workStartYear")}                                    
                      />
                    </div>
                  </div>
                  <div className='col-md-3 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>Work End Year</label>
                      <input
                        type='month'
                        className='form-control'
                        {...register("workEndYear")}                    
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
                          {...register("workEndPresent")}                       
                          style={{ width: '25px', height: '25px' }}                       
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
                        disabled
                      />
                    </div>
                  </div>
                  <div className='col-md-4 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>ATI Start Year <span className='text-danger'>*</span></label>
                      <input
                        type='month'
                        className='form-control'
                        {...register("aTIStartYear")}                    
                      />
                    </div>
                  </div>
                  <div className='col-md-3 px-2'>
                    <div className='mb-3'>
                      <label className='form-label'>ATI End Year</label>
                      <input
                        type='month'
                        className='form-control'
                        {...register("aTIEndYear")}               
                        placeholder=''
                     
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
                          style={{ width: '25px', height: '25px' }}
                          checked={value.ATiEndPresent}
                       
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
                        name='yearEmployer'                      
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
                  style={{width: "50px"}}
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
            <div className='d-flex justify-content-end gap-2 mt-2'>
              <Link to='/' className='btn-cancel'>Cancel</Link>
              <button type='submit' className='btn-save'>Save</button>
              {/* <button type='submit' className='btn-save'>Export</button> */}
            </div>
          </div>
        </form>
        <AddEditProject projectId={projectId} />
      </div>
    </>
  )
}

export default AddEmployee

