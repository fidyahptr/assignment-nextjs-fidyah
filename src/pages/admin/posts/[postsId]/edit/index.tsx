import useFetch from "@/hooks/useFetch";
import { IPosts } from "@/interface";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InputGroup from "@/components/inputGroup";
import TextArea from "@/components/inputGroup/textArea";
import { validateNews } from "@/utils/validation";
import { toast } from "sonner";

const EditPosts = (): JSX.Element => {
  const { data, fetchData: fetchPostData } = useFetch<IPosts>();
  const { data: dataEdit, fetchData: fetchEditData } = useFetch<IPosts>();
  const [postData, setPostData] = useState<IPosts>(
    data || {
      title: "",
      desc: "",
      picture: "",
      isPremium: false,
      category: "",
      like: [],
      share: 0,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    }
  );
  const [image, setImage] = useState<File | undefined>();
  const [url, setUrl] = useState<string>("");
  const [errors, setErrors] = useState({
    title: "",
    desc: "",
    category: "",
    picture: "",
  });
  const router = useRouter();
  const id = router.query.postsId;

  useEffect(() => {
    if (dataEdit !== null) {
      toast.success("Product has been edit!");
      router.push("/admin/posts");
    }
  }, [dataEdit]);

  useEffect(() => {
    if (data !== null) {
      setPostData(data);
      setPostData((prevData) => ({
        ...prevData,
        updatedAt: new Date().toLocaleDateString() as string,
      }));
      setUrl(data.picture);
    }
  }, [data]);

  useEffect(() => {
    fetchPostData(`posts/${id}`, { method: "get" });
  }, [router]);

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    let newImage;
    toast.loading("Image uploading");
    if (files && files.length > 0) {
      newImage = files[0];
    }
    if (newImage) {
      setImage(newImage);
    }
  };

  useEffect(() => {
    if (image !== undefined) {
      fetchImage();
    }
  }, [image]);

  useEffect(() => {
    if (url) {
      setPostData((prevData) => ({
        ...prevData,
        picture: url,
      }));
    }
  }, [url]);

  const fetchImage = async () => {
    try {
      const data = new FormData();
      if (image) {
        data.append("file", image);
      }
      data.append("upload_preset", "ppnffodq");
      data.append("cloud_name", "dh38vhao4");
      data.append("api_key", "371911546452948");
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/ppnffodq/image/upload`,
        {
          method: "post",
          body: data,
        }
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        ).message;
      }
      const result = await response.json();
      setUrl(result.secure_url);
    } catch (error: unknown) {
      console.log(error || "An error occurred while fetching data");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const errorMessage = validateNews(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    if (type === "checkbox") {
      setPostData((postData) => ({
        ...postData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setPostData((postData) => ({ ...postData, [name]: value }));
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { ...errors };

    Object.keys(postData).forEach((fieldName) => {
      const value = postData[fieldName as keyof IPosts];
      const errorMessage = validateNews(fieldName, String(value));

      newErrors[fieldName as keyof typeof newErrors] = errorMessage;

      if (errorMessage) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isFormValid = validateForm();

    if (isFormValid) {
      fetchEditData(`posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    } else {
      toast.error("Please fill all required fields correctly.");
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="grid gap-4 mt-8 max-w-lg">
        <div>
          <InputGroup
            type="text"
            name="title"
            label="Title"
            value={postData.title}
            placeholder="Enter your title.."
            handleInput={handleChange}
            error={errors.title}
          />
        </div>
        <div>
          <TextArea
            name="desc"
            label="Description"
            value={postData.desc}
            placeholder="Write your news here.."
            handleInput={handleChange}
            error={errors.desc}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select category
          </label>
          <select
            id="category"
            name="category"
            value={postData.category}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option selected>Choose category</option>
            <option value="tech">Tech</option>
            <option value="social">Social</option>
            <option value="health">Health</option>
          </select>
          {errors.category && (
            <div className="text-red-500 text-sm">{errors.category}</div>
          )}
        </div>

        <div className="flex items-center mb-4">
          <input
            id="isPremium"
            type="checkbox"
            name="isPremium"
            defaultChecked={postData.isPremium}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label
            htmlFor="isPremium"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Premium News
          </label>
        </div>

        <div className="flex items-center justify-center w-full gap-5">
          {url && <img src={url} alt="photo upload" width={150} height={150} />}
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPEG or JPG
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImage}
            />
          </label>
        </div>

        {errors.picture && (
          <div className="text-red-500 text-sm">{errors.picture}</div>
        )}
        <input
          type="submit"
          className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        />
      </form>
    </AdminLayout>
  );
};

export default EditPosts;
