import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputNumber } from 'primereact/inputnumber';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import toast from 'react-hot-toast';
import { VALIDATION_POSITIVE_NUMBER_FIELD, VALIDATION_REQUIRED_FIELD_MSG } from '../../../constants/formValidation';
import { API_URL, MAX_FILE_SIZE } from '../../../constants/globals';
import { PrimeIcons } from 'primereact/api';

const productSchema = z.object({
  name: z.string().nonempty(VALIDATION_REQUIRED_FIELD_MSG),
  description: z.string().optional(),
  price: z.number().min(0, VALIDATION_POSITIVE_NUMBER_FIELD('price')),
  images: z.array(z.instanceof(File)).max(10).optional()
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      images: [],
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());

    if(data.images){
      data.images.forEach((file) => {
      formData.append('images', file);
    });
    }
    

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${API_URL}/product`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        toast.success('Product created successfully');
        navigate('/home');
      } else {
        toast.error('Error while creating product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputText {...field} className="w-full" />
            )}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputTextarea {...field} rows={5} className="w-full" />
            )}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Price</label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <InputNumber
                value={field.value}
                onValueChange={(e) => field.onChange(e.value)}
                className="w-full"
                mode="currency"
                currency="BRL"
                minFractionDigits={2}
                maxFractionDigits={2}
              />
            )}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>}
        </div>
        <div>
          <label className="block mb-1 font-semibold">Images (max 10)</label>
          <Controller
            name="images"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FileUpload
                name="images"
                multiple
                customUpload
                emptyTemplate={
                  <div className="flex flex-col items-center">
                    <i className="pi pi-image text-4xl text-gray-400"></i>
                    <p className="mt-2 text-sm text-gray-500">Drop and drag images or click select the images.</p>
                  </div>
                }
                uploadHandler={(e) => {
                  onChange(e.files);
                }}
                onRemove={(e) => {
                  if(value){
                    const newFiles = value.filter((file: File) => file.name !== e.file.name);
                    onChange(newFiles);
                  }   
                }}
                accept="image/*"
                maxFileSize={MAX_FILE_SIZE}
                removeIcon={PrimeIcons.TRASH}
              />
            )}
          />
          {errors.images && <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>}
        </div>

        <Button label="Create Product" icon="pi pi-check" type="submit" />
      </form>
    </div>
  );
};

export default CreateProductPage;