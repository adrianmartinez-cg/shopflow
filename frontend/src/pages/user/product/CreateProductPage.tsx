import { useState } from 'react';
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

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be positive'),
});

type ProductFormData = z.infer<typeof productSchema>;

const CreateProductPage = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);

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
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('price', data.price.toString());

    images.forEach((file) => {
      formData.append('images', file);
    });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        toast.success('Product created successfully');
        navigate('/');
      } else {
        toast.error('Error while creating product');
      }
    } catch (err) {
      console.error(err);
      toast.error('Unexpected error');
    }
  };

  const handleUpload = (e: any) => {
    const files = e.files.slice(0, 10);
    setImages(files);
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <FileUpload
            name="images[]"
            multiple
            customUpload
            uploadHandler={handleUpload}
            accept="image/*"
            maxFileSize={10000000}
          />
        </div>

        <Button label="Create Product" icon="pi pi-check" type="submit" />
      </form>
    </div>
  );
};

export default CreateProductPage;